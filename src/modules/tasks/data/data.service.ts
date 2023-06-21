import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Between, LessThan, Repository } from 'typeorm';
import { TaskResponseEntity } from '../model/taskResponse.entity';
import {
  InApp_TaskType,
  Out_TaskType,
  TaskStatus,
} from '@src/utils/enums/TasksTypes';
import { TaskDataEntity } from '../model/tasks.entity';
import {
  CreateTaskDto,
  FilterTaskDto,
  JobResponseDto,
  UpdateReportDto,
  UpdateStatusDto,
  UpdateTaskDto,
  UpdateTaskResponseDto,
} from '../dto/tasks.dto';
import { JobResponseEntity } from '../model/jobResponse.entity';
import { TaskResponderEntity } from '../model/taskResponder.entity';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class TaskDataService {
  constructor(
    @InjectRepository(TaskDataEntity)
    private taskRepository: Repository<TaskDataEntity>,

    @InjectRepository(TaskResponseEntity)
    private taskResponseRepository: Repository<TaskResponseEntity>,

    @InjectRepository(TokenReward)
    private tokenRepo: Repository<TokenReward>,

    @InjectRepository(BountyRecord)
    private bountyRecordRepo: Repository<BountyRecord>,

    @InjectRepository(BrandEntity)
    private brandRepo: Repository<BrandEntity>,

    @InjectRepository(TaskResponseRecord)
    private taskResponseRecordRepo: Repository<TaskResponseRecord>,

    @InjectRepository(JobResponseEntity)
    private jobResponseRepo: Repository<JobResponseEntity>,

    @InjectRepository(TaskResponderEntity)
    private taskResponder: Repository<TaskResponderEntity>,

    private readonly httpService: HttpService,
    private readonly rewardService: RewardsService,
    private readonly brandService: BrandsService,
    private readonly followService: FollowerService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,

    private readonly tasksResultService: TasksResultService,
  ) {}

  // fetch based on contract address

  async findNextTask(contractAddress: string) {
    const token = await this.tokenRepo.findOne({
      where: {
        contractAddress,
      },
    });

    if (!token) {
      // throw new HttpException('Token not found', 400);

      // create a bounty record

      await this.createABountyRecord(contractAddress);

      console.log('Token not found');

      return false;
    }

    console.log('TOKEN CONTRACT ADDRESS', token.contractAddress);

    const nextTask = await this.taskRepository.findOne({
      relations: ['brand', 'token'],
      order: {
        created_at: 'DESC',
      },
      where: {
        status: TaskStatus.PENDING,
        token: {
          contractAddress,
        },
      },
    });

    if (nextTask) {
      await this.taskRepository.update(nextTask.id, {
        status: TaskStatus.ACTIVE,
        start_date: new Date(),
      });
      console.log('TASK IS NOW ACTIVE');
    } else {
      // throw new HttpException(
      //   'No task for this reward yet',
      //   HttpStatus.NOT_FOUND,
      // );

      // create a bountyrecord
      await this.createABountyRecord(contractAddress);

      console.log('No task for this reward yet');

      return false;
    }
  }

  async createABountyRecord(contractAddress: string) {
    const bountyRecord = new BountyRecord();
    bountyRecord.contractAddress = contractAddress;
    return await this.bountyRecordRepo.save(bountyRecord);
  }

  async getBrandTasks(brandId: number) {
    const tasks = await this.taskRepository.find({
      relations: ['brand', 'token'],
      where: {
        brand_id: brandId,
      },
    });

    return tasks;
  }

  async findActiveTasks({
    reward,
    page,
    limit,
    type,
    brand,
    sort,
  }: FilterTaskDto) {
    try {
      const checkReward = await this.rewardService.findOneById(reward);

      if (reward && !checkReward) {
        throw new HttpException('Reward not found', 400);
      }

      const checkBrand = await this.brandService.findOneByBrandId(brand);

      if (brand && !checkBrand) {
        throw new HttpException('Brand not found', 400);
      }

      page = page ? page : 1;

      let tasks = [];

      if (sort?.expiring) {
        tasks = await this.taskRepository.find({
          relations: ['brand', 'token'],
          where: {
            status: TaskStatus.ACTIVE,
            time_frame_in_hours: LessThan(24),
            expired: false,
            ...(reward && { token: { rewardId: reward } }),
            ...(brand && { brand_id: brand }),
            ...(type && { task_type: type }),
          },
          skip: +page === 1 ? 0 : (+page - 1) * limit,
          take: limit ? limit : 10,
          order: {
            created_at: sort ? sort.order : 'DESC',
          },
        });
      } else if (sort?.trending) {
        tasks = await this.taskRepository.find({
          relations: ['brand', 'token'],
          where: {
            status: TaskStatus.ACTIVE,
            expired: false,
            ...(reward && { token: { rewardId: reward } }),
            ...(brand && { brand_id: brand }),
            ...(type && { task_type: type }),
          },
          skip: +page === 1 ? 0 : (+page - 1) * limit,
          take: limit ? limit : 10,
          order: {
            created_at: sort ? sort.order : 'DESC',
            viewCount: 'DESC',
            updated_at: 'DESC',
          },
        });
      } else if (sort?.maxPrice && sort?.minPrice) {
        tasks = await this.taskRepository.find({
          relations: ['brand', 'token'],
          where: {
            status: TaskStatus.ACTIVE,
            expired: false,
            price: Between(sort.minPrice, sort.maxPrice),
            ...(reward && { token: { rewardId: reward } }),
            ...(brand && { brand_id: brand }),
            ...(type && { task_type: type }),
          },
          skip: +page === 1 ? 0 : (+page - 1) * limit,
          take: limit ? limit : 10,
          order: {
            created_at: sort ? sort.order : 'DESC',
          },
        });
      } else {
        tasks = await this.taskRepository.find({
          relations: ['brand', 'token'],
          where: {
            status: TaskStatus.ACTIVE,
            expired: false,
            ...(reward && { token: { rewardId: reward } }),
            ...(brand && { brand_id: brand }),
            ...(type && { task_type: type }),
          },
          skip: +page === 1 ? 0 : (+page - 1) * limit,
          take: limit ? limit : 10,
          order: {
            created_at: sort ? sort.order : 'DESC',
          },
        });
      }

      const count = await this.taskRepository.count({
        where: {
          is_deleted: false,
          expired: false,
          status: TaskStatus.ACTIVE,
          ...(reward && { token: { rewardId: reward } }),
          ...(brand && { brand_id: brand }),
          ...(type && { task_type: type }),
        },
      });

      const pagination: pagination = {
        currentPage: page,
        limit: limit,
        totalPage: Math.ceil(count / limit),
        nextPage: Math.ceil(count / limit) > page ? page + 1 : null,
        previousPage: page === 1 ? null : page - 1,
      };

      return {
        tasks: tasks as TaskDataEntity[],
        pagination,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne({
      relations: ['brand', 'token'],
      where: {
        id,
        status: TaskStatus.ACTIVE,
        expired: false,
      },
    });

    if (!task) {
      throw new HttpException('Task not found', 400);
    }

    task.viewCount = task.viewCount + 1;

    await this.taskRepository.save(task);

    return task;
  }

  async getUsersTasks(user_id: number, page: number, limit: number) {
    page = page ? page : 1;

    const tasks = await this.taskResponder.find({
      relations: ['task', 'task.brand', 'task.token', 'task.token.reward'],
      where: {
        user_id,
      },
      skip: +page === 1 ? 0 : (+page - 1) * limit,
      take: limit ? limit : 10,
    });

    const count = await this.taskResponder.count({
      where: {
        user_id,
      },
    });

    const pagination: pagination = {
      currentPage: page,
      limit: limit,
      totalPage: Math.ceil(count / limit),
      nextPage: Math.ceil(count / limit) > page ? page + 1 : null,
      previousPage: page === 1 ? null : page - 1,
    };

    return {
      tasks: tasks as TaskResponderEntity[],
      pagination,
    };
  }

  async getUsersSingleTasks(user_id: number, task_id: number) {
    const task = await this.taskResponder.findOne({
      relations: ['task', 'task.brand', 'task.token', 'task.token.reward'],
      where: {
        user_id,
        task_id: task_id,
      },
    });

    if (!task) {
      throw new HttpException('Task not found', 404);
    }

    return task;
  }

  async getWinners(task_id: number, page: number, limit: number): Promise<any> {
    page = page ? page : 1;

    const winners = await this.taskResponder.find({
      where: {
        task_id,
        winner: true,
      },
      relations: ['user'],
      select: {
        user: {
          firstName: true,
          lastName: true,
          username: true,
          profilePicture: true,
        },
      },
      skip: +page === 1 ? 0 : (+page - 1) * limit,
      take: limit ? limit : 10,
    });

    const count = await this.taskResponder.count({
      where: {
        task_id,
      },
    });

    const pagination: pagination = {
      currentPage: page,
      limit: limit,
      totalPage: Math.ceil(count / limit),
      nextPage: Math.ceil(count / limit) > page ? page + 1 : null,
      previousPage: page === 1 ? null : page - 1,
    };

    return {
      winners: winners as TaskResponderEntity[],
      pagination,
    };
  }

  async joinTask(task_id: number, user_id: number) {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id: task_id,
        },
      });

      if (!task) {
        throw new HttpException('Task not found', 400);
      }

      if (task?.status !== TaskStatus.ACTIVE) {
        throw new HttpException('Task is not active', 400);
      }

      const availableTaskTypes = [
        Out_TaskType.OUT_BRAND_TAGGING,
        Out_TaskType.OUT_SM_FOLLOW,
        Out_TaskType.OUT_LIKE_POST,
        Out_TaskType.OUT_REPOST,
      ];

      const user = await this.userService.findOneByid(user_id as any);

      const isTaskInAvailableTaskTypes =
        availableTaskTypes.filter((type) => type === task?.task_type).length >
        0;

      console.log(isTaskInAvailableTaskTypes, user_id);

      if (
        availableTaskTypes.filter((type) => type === task?.task_type).length >
          0 &&
        !user?.twitterUsername
      ) {
        throw new HttpException(
          'Please connect your twitter account to join this task',
          400,
        );
      }

      // check if current date is within the time frame
      const isValid = moment().isBetween(
        moment(task?.created_at).subtract(1, 'hours'),
        moment(task?.start_date).add(task?.time_frame_in_hours, 'hours'),
      );

      if (!isValid) {
        throw new HttpException('Task is no longer active', 400);
      }

      // check if responses is times 2 of number of possible winners
      const responses = await this.taskResponder.count({
        where: {
          task_id,
          task_cancelled: false,
        },
      });

      if (responses >= task?.number_of_winners * 2) {
        throw new HttpException('Task is no longer active', 400);
      }

      const checkResponser = await this.taskResponder.findOne({
        where: {
          task_id,
          user_id,
        },
      });

      if (checkResponser?.task_cancelled) {
        checkResponser.task_cancelled = false;
        checkResponser.current_step = 1;
        return await this.taskResponder.save(checkResponser);
      }

      if (checkResponser) {
        throw new HttpException('You have already joined this task', 400);
      }

      const taskResponse = new TaskResponderEntity();
      taskResponse.task_id = task_id;
      taskResponse.user_id = user_id;

      const response = await this.taskResponder.save(taskResponse);

      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async moveToSecondStep(user_id: number, task_id: number) {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id: task_id,
        },
      });

      if (!task) {
        throw new HttpException('Task not found', 400);
      }

      if (task.status !== TaskStatus.ACTIVE) {
        throw new HttpException('Task is not active', 400);
      }

      // check if current date is within the time frame
      const isValid = moment().isBetween(
        moment(task.created_at).subtract(1, 'hours'),
        moment(task.start_date).add(task.time_frame_in_hours, 'hours'),
      );

      if (!isValid) {
        throw new HttpException('Task is no longer active', 400);
      }

      // check if responses is times 2 of number of possible winners
      const responses = await this.taskResponder.count({
        where: {
          task_id,
          task_cancelled: false,
        },
      });

      if (responses >= task.number_of_winners * 2) {
        throw new HttpException('Task is no longer active', 400);
      }

      const checkResponser = await this.taskResponder.findOne({
        where: {
          task_id,
          user_id,
        },
      });

      if (!checkResponser) {
        throw new HttpException('You have not joined the task', 400);
      }

      if (checkResponser?.task_performed) {
        throw new HttpException('Task already done.', 400);
      }

      checkResponser.current_step = 2;

      const response = await this.taskResponder.save(checkResponser);

      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async create(data: CreateTaskDto) {
    try {
      const band_id: any = data.brand_id;

      const brand = await this.brandRepo.findOneBy({ id: band_id });
      const reward = await this.tokenRepo.findOne({
        where: {
          rewardId: data.reward_token_id,
        },
      });

      if (!brand) {
        throw new HttpException('Brand not found', 400);
      }

      if (!reward) {
        throw new HttpException('Reward not found', 400);
      }

      data.reward_token_id = reward.id;

      const task = this.taskRepository.create(data);
      return await this.taskRepository.save(task);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: number, data: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id });

    if (
      task.status === TaskStatus.ACTIVE ||
      task.status === TaskStatus.COMPLETED
    ) {
      throw new HttpException('Task is already active or completed', 400);
    }

    if (task.brand_id !== data.brand_id) {
      throw new HttpException('Brand cannot be changed', 401);
    }

    await this.taskRepository.update(id, data);
    return await this.taskRepository.findOneBy({ id });
  }

  async updateStatus(id: number, data: UpdateStatusDto) {
    const task = await this.taskRepository.findOneBy({ id });

    if (task.status === TaskStatus.PENDING) {
      throw new HttpException('Task is still pending', 400);
    }

    if (task.status === TaskStatus.COMPLETED) {
      throw new HttpException('Task is already completed', 400);
    }

    await this.taskRepository.update(id, data);
    return await this.taskRepository.findOneBy({ id });
  }

  async updateReport(id: number, data: UpdateReportDto) {
    const task = await this.taskRepository.findOneBy({ id });

    if (task.status === TaskStatus.PENDING) {
      throw new HttpException('Task is still pending', 400);
    }

    if (task.status === TaskStatus.COMPLETED) {
      throw new HttpException('Task is already completed', 400);
    }

    await this.taskRepository.update(id, data);
    return await this.taskRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOneBy({ id });

    if (
      task.status === TaskStatus.ACTIVE ||
      task.status === TaskStatus.COMPLETED
    ) {
      throw new HttpException('Task is already active or completed', 400);
    }

    await this.taskRepository.delete(id);
    return { deleted: true };
  }

  async respondToTask(data: UpdateTaskResponseDto) {
    try {
      const task = await this.taskRepository.findOneBy({
        id: data.task_id,
        status: TaskStatus.ACTIVE,
      });

      if (!task) {
        throw new HttpException('Task is not active', 400);
      }

      // check if current date is within the time frame
      const isValid = moment().isBetween(
        moment(task.created_at).subtract(1, 'hours'),
        moment(task.start_date).add(task.time_frame_in_hours, 'hours'),
      );

      if (!isValid) {
        throw new HttpException('Task is no longer active', 400);
      }

      // check if user joined the task
      const userJoinedTask = await this.taskResponder.findOne({
        where: {
          task_id: data.task_id,
          user_id: data.user_id,
        },
      });

      if (!userJoinedTask) {
        throw new HttpException('Please join task', 400);
      }

      const userHasResponded = await this.taskResponseRepository.findOne({
        where: {
          user_id: data.user_id,
          task_id: data.task_id,
        },
      });

      const walletHasResponded = await this.taskResponseRepository.findOne({
        where: {
          wallet_address: data.wallet_address,
          task_id: data.task_id,
        },
      });

      if (walletHasResponded) {
        console.log('WALLET HAS ALREADY RESPONDED');
        throw new HttpException('User has already responded', 400);
      }

      if (userHasResponded) {
        throw new HttpException('User has already responded', 400);
      }

      const taskResponse = this.taskResponseRepository.create(data);
      return await this.taskResponseRepository.save(taskResponse);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  async sendResponseToJobLauncher() {
    try {
      // send response and close task

      const activeTask = await this.taskRepository.findOne({
        relations: ['brand', 'token'],
        where: { status: TaskStatus.ACTIVE },
      });

      if (activeTask) {
        // check if time frame has elapsed
        const isValid = moment().isBetween(
          moment(activeTask.created_at).subtract(1, 'hours'),
          moment(activeTask.created_at).add(
            activeTask.time_frame_in_hours,
            'hours',
          ),
        );

        // check if responses has times 2 of number of winners
        const taskResponse = await this.taskResponseRepository.count({
          where: { task_id: activeTask.id },
        });

        const availableTaskTypes = [
          TaskType.OUT_PRODUCT_TAGGING,
          TaskType.OUT_REFERRAL_SIGNUP,
          TaskType.OUT_OTHER_REFERRAL,
          TaskType.OUT_WEBSITE_VISIT,
          TaskType.OUT_SHARING,
        ];

        if (availableTaskTypes.includes(activeTask.task_type)) {
          if (isValid || taskResponse >= activeTask.number_of_winners * 2) {
            // check if last record has escrow address
            const lastRecord = await this.taskResponseRecordRepo.findOne({
              where: { escrowUpdated: false },
              order: { id: 'DESC' },
            });

            if (lastRecord) {
              // create escrow address
              return 'Last job record is pending escrow address update';
            }

            // send response to job launcher
            const taskResponse = await this.taskResponseRepository.find({
              where: { task_id: activeTask.id },
              relations: ['user'],
              take: activeTask.number_of_winners * 2,
            });

            if (taskResponse.length > 0) {
              const response = taskResponse.map((item) => {
                return {
                  datapoint_uri: item.response_url,
                };
              });

              const lastRecord = await this.taskResponseRepository.findOne({
                where: { task_id: activeTask.id },
                order: { id: 'DESC' },
              });

              const manifestHash = uuidV4();

              const body = {
                id: lastRecord.id + 1,
                networkId: 1,
                status: 'PENDING',
                dataUrl: `<${process.env.BASE_URL}>`,
                data: response,
                manifestHash: manifestHash,
                datasetLength: response.length,
                annotationsPerImage: 3,
                labels: [
                  ...taskResponse.map((item) => {
                    return item.user.username ?? item.wallet_address;
                  }),
                ], // but the username for now
                requesterDescription: activeTask.description,
                requesterAccuracyTarget: 0.98,
                requesterQuestion: activeTask.title,
                requesterQuestionExample: 'string',
                tokenAddress: '0x1413862C2B7054CDbfdc181B83962CB0FC11fD92',
                price: 60,
                mode: 'BATCH',
                requestType: 'IMAGE_LABEL_BINARY',
              };

              // create a manifest file with body data and save to public folder
              const manifest = JSON.stringify(body);
              writeFile(
                `./public/uploads/manifests/${manifestHash}.json`,
                manifest,
                'utf8',
              );

              const newRecord = new TaskResponseRecord();
              newRecord.task_id = activeTask.id;
              newRecord.manifest_hash = manifestHash;
              newRecord.manifest_url =
                process.env.BASE_URL +
                `/public/uploads/manifests/${manifestHash}.json`;

              const initializeJob = await this.httpService.axiosRef.post(
                `${process.env.JOB_LAUNCHER_URL}/joblauncher/initialize-job`,
              );

              if (initializeJob.status >= 200 && initializeJob.status < 300) {
                newRecord.isReady = false;
              }

              const record = this.taskResponseRecordRepo.create(newRecord);

              // close task
              await this.taskRepository.update(activeTask.id, {
                status: TaskStatus.COMPLETED,
              });

              return await this.taskResponseRecordRepo.save(record);
            }
          }
        } else {
          console.log('Task is still active');
          return 'Task is still active';
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  async checkJobStatus() {
    // get one record with no escrow address
    const record = await this.taskResponseRecordRepo.findOne({
      where: { escrowUpdated: false },
    });

    if (record) {
      if (!record.isReady) {
        const initializeJob = await this.httpService.axiosRef.post(
          `${process.env.JOB_LAUNCHER_URL}/joblauncher/initialize-job`,
        );

        if (initializeJob.status >= 200 && initializeJob.status < 300) {
          record.isReady = true;
        }

        console.log('A new job was created');
        return await this.taskResponseRecordRepo.save(record);
      }

      const escrowAddress = await this.httpService.axiosRef.get(
        `${process.env.JOB_LAUNCHER_URL}/joblauncher/get-lastEscrow`,
      );

      if (escrowAddress.status >= 200 && escrowAddress.status < 300) {
        const setupJob = await this.httpService.axiosRef.post(
          `${process.env.JOB_LAUNCHER_URL}/joblauncher/setup-job`,
          {
            escrowAddress: escrowAddress.data,
            manifestUrl: record.manifest_url,
            manifestHash: record.manifest_hash,
          },
        );

        if (setupJob.status >= 200 && setupJob.status < 300) {
          record.escrow_address = escrowAddress.data;
          record.escrowUpdated = true;
          console.log('Escrow address was updated and job was setup');
          return await this.taskResponseRecordRepo.save(record);
        }
      }
    }
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  async fundJob() {
    // get one record with no escrow address
    const record = await this.taskResponseRecordRepo.findOne({
      where: { isFunded: false },
    });

    if (record) {
      if (record.isReady && record.escrowUpdated) {
        const localUrl = `./public/uploads/manifests/${record.manifest_hash}.json`;
        const data = await readFile(localUrl, 'utf8');

        const mani = JSON.parse(data);

        const fundJob = await this.httpService.axiosRef.post(
          `${process.env.JOB_LAUNCHER_URL}/joblauncher/fundJob`,
          {
            escrowAddress: record.escrow_address,
            amount: `${mani.price}`,
          },
        );

        console.log(fundJob.data);

        if (fundJob.status >= 200 && fundJob.status < 300) {
          record.isFunded = true;
          console.log('Job was funded');
          return await this.taskResponseRecordRepo.save(record);
        }
      }
    }
  }

  async getTaskManifestDetails(url: string) {
    try {
      const manifest = await this.taskResponseRecordRepo.findOne({
        where: { manifest_url: url },
      });

      if (!manifest) {
        throw new HttpException('Manifest not found', 404);
      }

      // get details from the manifest url
      const localUrl = `./public/uploads/manifests/${manifest.manifest_hash}.json`;
      const data = await readFile(localUrl, 'utf8');

      const mani = JSON.parse(data);

      return {
        responseLength: mani.datasetLength,
        totalDemandedResponse: mani.annotationsPerImage,
        price: mani.price,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateManifest(url: string) {
    try {
      const manifest = await this.taskResponseRecordRepo.findOne({
        where: { manifest_url: url },
      });

      if (!manifest) {
        throw new HttpException('Manifest not found', 404);
      }

      // get details from the manifest url
      const localUrl = `./public/uploads/manifests/${manifest.manifest_hash}.json`;
      const data = await readFile(localUrl, 'utf8');

      const mani = JSON.parse(data);

      mani.status = 'COMPLETED';

      // create a manifest file with body data and save to public folder
      const manifestData = JSON.stringify(mani);
      writeFile(
        `./public/uploads/manifests/${manifest.manifest_hash}.json`,
        manifestData,
        'utf8',
      );

      return 'Manifest updated';
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async storeNewResponse(data: JobResponseDto) {
    try {
      const taskRecord = await this.taskResponseRecordRepo.findOne({
        where: {
          escrow_address: data.escrow_address,
        },
      });

      if (!taskRecord) {
        throw new HttpException('Task record (Job) not found', 404);
      }

      const checkIfSubmitted = await this.jobResponseRepo.findOne({
        where: {
          workerAddress: data.worker_address,
          task_record_id: taskRecord.id,
        },
      });

      if (checkIfSubmitted) {
        throw new HttpException('Worker has already submitted', 400);
      }

      const job = new JobResponseEntity();
      job.workerAddress = data.worker_address;
      job.escrowAddress = data.escrow_address;
      job.task_record_id = taskRecord.id;
      job.response = data.responses;

      await this.jobResponseRepo.save(job);

      return this.jobResponseRepo.count({
        where: {
          task_record_id: taskRecord.id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getStoredResponses(escrowAddress: string) {
    try {
      if (!escrowAddress) {
        throw new HttpException('Escrow address is required', 400);
      }

      const taskRecord = await this.taskResponseRecordRepo.findOne({
        where: {
          escrow_address: escrowAddress,
        },
      });

      if (!taskRecord) {
        throw new HttpException('Task record not found', 404);
      }

      const responses = await this.jobResponseRepo.find({
        where: {
          task_record_id: taskRecord.id,
        },
      });

      // get responses from each responses

      return {
        jobResponses: [
          ...responses.map((item) => {
            return item.response;
          }),
        ],
        workerAddresses: [
          ...responses.map((item) => {
            return item.workerAddress;
          }),
        ],
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async checkIfIsExistingEscrow(escrowAddress: string) {
    try {
      const taskRecord = await this.taskResponseRecordRepo.findOne({
        where: {
          escrow_address: escrowAddress,
        },
      });

      if (!taskRecord) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async checkIfWorkerHadSubmittedAResponse(
    workerAddress: string,
    escrowAddress: string,
  ) {
    try {
      const taskRecord = await this.taskResponseRecordRepo.findOne({
        where: {
          escrow_address: escrowAddress,
        },
      });

      if (!taskRecord) {
        throw new HttpException('Task record (Job) not found', 404);
      }

      const response = await this.jobResponseRepo.findOne({
        where: {
          workerAddress: workerAddress,
          task_record_id: taskRecord.id,
        },
      });

      if (!response) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async checkTaskForBountyRecords() {
    try {
      const bounties = await this.bountyRecordRepo.find({
        where: {
          expired: false,
        },
      });

      if (bounties.length > 0) {
        for (const bounty of bounties) {
          const token = await this.tokenRepo.findOne({
            where: {
              contractAddress: bounty.contractAddress,
            },
          });

          if (token) {
            console.log('TOKEN CONTRACT ADDRESS', token.contractAddress);

            const nextTask = await this.taskRepository.findOne({
              relations: ['brand', 'token'],
              order: {
                created_at: 'DESC',
              },
              where: {
                status: TaskStatus.PENDING,
                token: {
                  contractAddress: token.contractAddress,
                },
              },
            });

            if (nextTask) {
              await this.taskRepository.update(nextTask.id, {
                status: TaskStatus.ACTIVE,
              });

              await this.bountyRecordRepo.update(bounty.id, {
                expired: true,
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  // CRON JOB TO SELECT WINNERS FOR A TASK
  // @Cron(CronExpression.EVERY_MINUTE)
  async completeTask() {
    try {
      // send response and close task

      const activeTasks = await this.taskRepository.find({
        relations: ['brand', 'token'],
        where: { status: TaskStatus.ACTIVE },
      });

      for (let index = 0; index < activeTasks.length; index++) {
        const activeTask = activeTasks[index];

        if (activeTask) {
          // check if time frame has elapsed
          // const isValid = moment().isBetween(
          //   moment(activeTask.created_at).subtract(1, 'hours'),
          //   moment(activeTask.created_at).add(
          //     activeTask.time_frame_in_hours,
          //     'hours',
          //   ),
          // );

          // send response to job launcher
          const taskResponders = await this.taskResponder.find({
            where: {
              task_id: activeTask.id,
              task_cancelled: false,
            },
            relations: ['user'],
            take: activeTask.number_of_winners * 2,
          });

          for (let index = 0; index < taskResponders.length; index++) {
            const response = taskResponders[index];

            await this.validateResponse(activeTask, response);
          }
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async completeUserTask(task_id: number, user_id: number) {
    const task = await this.taskRepository.findOneBy({ id: task_id });

    if (!task) {
      throw new HttpException('Task not found', 404);
    }

    const response = await this.taskResponder.findOne({
      where: {
        user_id,
        task_id,
      },
      relations: ['user'],
    });

    if (!response) {
      throw new HttpException('Please join task first.', 400);
    }

    if (response.task_cancelled) {
      throw new HttpException('Task was cancelled.', 400);
    }

    if (response.task_performed) {
      throw new HttpException('Task already completed.', 400);
    }

    await this.validateResponse(task, response);

    return 'Task completed successfully.';
  }

  private async validateResponse(
    activeTask: TaskDataEntity,
    response: TaskResponderEntity,
  ) {
    const availableTaskTypes = [
      InApp_TaskType.IN_APP_COLLECTION,
      InApp_TaskType.IN_APP_FOLLOW,
      InApp_TaskType.IN_APP_PRODUCT_LIKE,
      InApp_TaskType.IN_APP_SHARE,
      Out_TaskType.OUT_SM_FOLLOW,
      Out_TaskType.OUT_BRAND_TAGGING,
      Out_TaskType.OUT_LIKE_POST,
      Out_TaskType.OUT_REPOST,
    ];

    if (availableTaskTypes.includes(activeTask.task_type)) {
      // validate response
      if (activeTask.task_type === InApp_TaskType.IN_APP_COLLECTION) {
        const check = await this.tasksResultService.verifyUserCollectedAnOffer(
          activeTask.offer_id,
          response.user_id,
        );

        if (check) {
          return await this.taskResponder.update(response.id, {
            task_performed: true,
            current_step: 3,
          });
        } else {
          return 'We could not validate your response';
        }
      }

      if (activeTask.task_type === InApp_TaskType.IN_APP_FOLLOW) {
        const check = await this.tasksResultService.verifyUserFollowsBrand(
          activeTask.brand_id,
          response.user_id,
        );

        if (check) {
          return await this.taskResponder.update(response.id, {
            task_performed: true,
            current_step: 3,
          });
        } else {
          return 'We could not validate your response';
        }
      }

      if (activeTask.task_type === InApp_TaskType.IN_APP_PRODUCT_LIKE) {
        const check = await this.tasksResultService.verifyUserLikedAnOffer(
          activeTask.offer_id,
          response.user_id,
        );

        if (check) {
          return await this.taskResponder.update(response.id, {
            task_performed: true,
            current_step: 3,
          });
        } else {
          return 'We could not validate your response';
        }
      }

      if (activeTask.task_type === InApp_TaskType.IN_APP_SHARE) {
        const check = await this.tasksResultService.verifyUserSharedAnOffer(
          activeTask.offer_id,
          response.user_id,
        );

        if (check) {
          return await this.taskResponder.update(response.id, {
            task_performed: true,
            current_step: 3,
          });
        } else {
          return 'We could not validate your response';
        }
      }

      if (activeTask.task_type === Out_TaskType.OUT_SM_FOLLOW) {
        const check =
          await this.tasksResultService.checkIfUserIsFollowingBrandOnTwitter(
            response.user.twitterUsername,
            activeTask.social_handle,
          );

        if (check) {
          return await this.taskResponder.update(response.id, {
            task_performed: true,
            current_step: 3,
          });
        } else {
          return 'We could not validate your response';
        }
      }

      if (activeTask.task_type === Out_TaskType.OUT_BRAND_TAGGING) {
        const responseData = await this.taskResponseRepository.findOne({
          where: {
            user_id: response.user_id,
            task_id: activeTask.id,
          },
        });

        const responseUrl = responseData.response_url;

        const tweetId = responseUrl.split('/').pop();

        const check =
          await this.tasksResultService.checkIfUserTaggedBrandOnTwitter(
            activeTask.social_handle,
            tweetId,
          );

        if (check) {
          return await this.taskResponder.update(response.id, {
            task_performed: true,
            current_step: 3,
          });
        } else {
          return 'We could not validate your response';
        }
      }

      if (activeTask.task_type === Out_TaskType.OUT_LIKE_POST) {
        const tweetId = activeTask.social_post?.split('/').pop();

        const check =
          await this.tasksResultService.checkIfUserLikesPostOnTwitter(
            response.user.twitterUsername,
            tweetId,
          );

        if (check) {
          return await this.taskResponder.update(response.id, {
            task_performed: true,
            current_step: 3,
          });
        } else {
          return 'We could not validate your response';
        }
      }

      if (activeTask.task_type === Out_TaskType.OUT_REPOST) {
        const tweetId = activeTask.social_post?.split('/').pop();

        const check =
          await this.tasksResultService.checkIfUserRepostedPostOnTwitter(
            response.user.twitterUsername,
            tweetId,
          );

        if (check) {
          return await this.taskResponder.update(response.id, {
            task_performed: true,
            current_step: 3,
          });
        } else {
          return 'We could not validate your response';
        }
      }
    }
  }

  // Select winners
  // @Cron(CronExpression.EVERY_MINUTE)
  async selectWinners() {
    // get all responders who performed task

    try {
      // send response and close task

      const activeTasks = await this.taskRepository.find({
        relations: ['brand', 'token'],
        where: { status: TaskStatus.ACTIVE },
      });

      for (let index = 0; index < activeTasks.length; index++) {
        const activeTask = activeTasks[index];

        if (activeTask) {
          // check if time frame has elapsed
          // const isValid = moment().isBetween(
          //   moment(activeTask.created_at).subtract(1, 'hours'),
          //   moment(activeTask.created_at).add(
          //     activeTask.time_frame_in_hours,
          //     'hours',
          //   ),
          // );

          // send response to job launcher
          const taskResponders = await this.taskResponder.find({
            where: {
              task_id: activeTask.id,
              task_cancelled: false,
              task_performed: true,
              winner: false,
            },
            relations: ['user'],
            take: activeTask.number_of_winners * 2,
          });

          for (let index = 0; index < taskResponders.length; index++) {
            const response = taskResponders[index];

            if (response) {
              // Send funds to winner

              response.winner = true;
              await this.taskResponder.save(response);

              const count = activeTask.winnerCount ?? 0;

              activeTask.winnerCount = count + 1;
              await this.taskRepository.save(activeTask);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async checkAvailableBounty() {
    // call blockchain to check available bounty
    //   const lastBountyRecord = await this.bountyRecordRepo.findOne({
    //     order: {
    //       created_at: 'DESC',
    //     },
    //   });
    //   if (lastBountyRecord) {
    //     const block = await this.web3Service.getHash(lastBountyRecord.block_number);
    //     if (block) {
    //       const blockNumber = block.number;
    //       const blockHash = block.hash;
    //       const blockTime = block.timestamp;
    //       const availableBounty = await this.web3Service.getAvailableBounty();
    //       const bountyRecord = this.bountyRecordRepo.create({
    //         block_number: blockNumber,
    //         block_hash: blockHash,
    //         block_time: blockTime,
    //         available_bounty: availableBounty,
    //       });
    //       await this.bountyRecordRepo.save(bountyRecord);
    //     }
  }

  // @Cron(CronExpression.EVERY_WEEK)
  // async deleteOldBountyRecords() {
  //   // delete old bounty records
  //   const bountyRecords = await this.bountyRecordRepo.find({
  //     order: {
  //       created_at: 'DESC',
  //     },
  //   });

  //   if (bountyRecords.length > 2) {
  //     const recordsToDelete = bountyRecords.slice(2);
  //     await this.bountyRecordRepo.remove(recordsToDelete);
  //   }
  // }

  // expire tasks that the time frame has elapsed
  // @Cron(CronExpression.EVERY_MINUTE)
  async expireTasks() {
    // const activeTasks = await this.taskRepository.find({
    //   relations: ['brand', 'token'],
    //   where: { status: TaskStatus.ACTIVE },
    // });
    // for (let index = 0; index < activeTasks.length; index++) {
    //   const activeTask = activeTasks[index];
    //   if (activeTask) {
    //     // check if time frame has elapsed
    //     const isValid = moment().isBetween(
    //       moment(activeTask.created_at).subtract(1, 'hours'),
    //       moment(activeTask.created_at).add(
    //         activeTask.time_frame_in_hours,
    //         'hours',
    //       ),
    //     );
    //     if (!isValid) {
    //       // send response to job launcher
    //       activeTask.expired = true;
    //       await this.taskRepository.save(activeTask);
    //     }
    //   }
    // }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async sendNotificationOfNewActiveTasks() {
    // const tasks = await this.taskRepository.find({
    //   relations: ['brand', 'token', 'token.reward'],
    //   where: {
    //     status: TaskStatus.ACTIVE,
    //     notification_sent: false,
    //   },
    // });
    // if (tasks.length > 0) {
    //   for (let index = 0; index < tasks.length; index++) {
    //     const task = tasks[index];
    //     const brand = await this.brandService.findOneByBrandId(task.brand.id);
    //     if (brand) {
    //       // find brand followers
    //       const followers = await this.followService.getBrandsFollowers(
    //         brand.id as any,
    //       );
    //       if (followers.length > 0) {
    //         for (let index = 0; index < followers.length; index++) {
    //           const follower = followers[index];
    //           const notification = new NotificationEntity();
    //           notification.user_id = follower.follower_id as any;
    //           notification.message = `New task available for ${task.token.symbol}. Join now to earn`;
    //           notification.type = NotificationType.POINT;
    //           notification.rewards = [task.token.reward];
    //           notification.title = 'New task available';
    //           notification.emailMessage = `
    //           <p>Hi ${follower.follower.firstName},</p>
    //           <p>There is a new task available for ${task.token.symbol}.</p>
    //           <p>Join now to earn.</p>
    //           <p>Regards,</p>
    //           `;
    //           if (notification) {
    //             await this.notificationService.createNotification(notification);
    //           }
    //         }
    //         await this.taskRepository.update(task.id, {
    //           notification_sent: true,
    //         });
    //       }
    //     }
    //   }
    // }
  }
}
