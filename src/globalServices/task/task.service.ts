import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsOrderValue, LessThan, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskResponse } from './entities/taskResponse.entity';
import { Reward } from '../reward/entities/reward.entity';
import { BountyService } from '../oracles/bounty/bounty.service';
import { Brand } from '../brand/entities/brand.entity';
import { TaskResponseRecord } from './entities/taskResponseRecord.entity';
import { JobResponse } from './entities/jobResponse.entity';
import { TaskResponder } from './entities/taskResponder.entity';
import { HttpService } from '@nestjs/axios';
import { RewardService } from '../reward/reward.service';
import { BrandService } from '../brand/brand.service';
import { FollowService } from '../follow/follow.service';
import { UserService } from '../user/user.service';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { BountyRecord } from './entities/bountyRecord.entity';
import { pagination } from '@src/utils/types/pagination';
import { AllTaskTypes } from '@src/utils/enums/TasksTypes';
import moment from 'moment';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(TaskResponse)
    private taskResponseRepository: Repository<TaskResponse>,

    @InjectRepository(Reward)
    private tokenRepo: Repository<Reward>,

    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,

    @InjectRepository(TaskResponseRecord)
    private taskResponseRecordRepo: Repository<TaskResponseRecord>,

    @InjectRepository(JobResponse)
    private jobResponseRepo: Repository<JobResponse>,

    @InjectRepository(TaskResponder)
    private taskResponder: Repository<TaskResponder>,

    @InjectRepository(BountyRecord)
    private bountyRecord: Repository<BountyRecord>,

    private readonly httpService: HttpService,
    private readonly rewardService: RewardService,
    private readonly brandService: BrandService,
    private readonly followService: FollowService,
    // private readonly notificationService: NotificationService,
    private readonly userService: UserService,
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
      relations: ['brand', 'reward'],
      order: {
        createdAt: 'DESC',
      },
      where: {
        status: ItemStatus.PENDING,
        reward: {
          contractAddress,
        },
      },
    });

    if (nextTask) {
      await this.taskRepository.update(nextTask.id, {
        status: ItemStatus.ACTIVE,
        startDate: new Date(),
      });
    } else {
      // create a bountyrecord
      await this.createABountyRecord(contractAddress);

      console.log('No task for this reward yet');

      return false;
    }
  }

  async createABountyRecord(contractAddress: string) {
    const bountyRecord = new BountyRecord();
    bountyRecord.contractAddress = contractAddress;

    return await this.bountyRecord.save(bountyRecord);
  }

  async getBrandTasks(brandId: number) {
    const tasks = await this.taskRepository.find({
      relations: ['brand', 'reward'],
      where: {
        brandId: brandId,
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
  }: {
    reward?: string;
    page?: number;
    limit?: number;
    type?: string;
    brand?: string;
    sort?: {
      order: FindOptionsOrderValue;
      trending: boolean;
      minPrice: number;
      maxPrice: number;
      expiring: boolean;
    };
  }) {
    try {
      const checkReward = await this.rewardService.findOneById(reward);

      if (reward && !checkReward) {
        throw new HttpException('Reward not found', 400);
      }

      const checkBrand = await this.brandService.getBrandById(brand);

      if (brand && !checkBrand) {
        throw new HttpException('Brand not found', 400);
      }

      page = page ? page : 1;

      let tasks = [];

      if (sort?.expiring) {
        tasks = await this.taskRepository.find({
          relations: ['brand', 'reward'],
          where: {
            status: ItemStatus.ACTIVE,
            timeFrameInHours: LessThan(24),
            expired: false,
            ...(reward && { token: { rewardId: reward } }),
            ...(brand && { brand_id: brand }),
            ...(type && { task_type: type }),
          },
          skip: +page === 1 ? 0 : (+page - 1) * limit,
          take: limit ? limit : 10,
          order: {
            createdAt: sort ? sort.order : 'DESC',
          },
        });
      } else if (sort?.trending) {
        tasks = await this.taskRepository.find({
          relations: ['brand', 'reward'],
          where: {
            status: ItemStatus.ACTIVE,
            expired: false,
            ...(reward && { token: { rewardId: reward } }),
            ...(brand && { brand_id: brand }),
            ...(type && { task_type: type }),
          },
          skip: +page === 1 ? 0 : (+page - 1) * limit,
          take: limit ? limit : 10,
          order: {
            createdAt: sort ? sort.order : 'DESC',
            viewCount: 'DESC',
            updatedAt: 'DESC',
          },
        });
      } else if (sort?.maxPrice && sort?.minPrice) {
        tasks = await this.taskRepository.find({
          relations: ['brand', 'reward'],
          where: {
            status: ItemStatus.ACTIVE,
            expired: false,
            price: Between(sort.minPrice, sort.maxPrice),
            ...(reward && { token: { rewardId: reward } }),
            ...(brand && { brand_id: brand }),
            ...(type && { task_type: type }),
          },
          skip: +page === 1 ? 0 : (+page - 1) * limit,
          take: limit ? limit : 10,
          order: {
            createdAt: sort ? sort.order : 'DESC',
          },
        });
      } else {
        tasks = await this.taskRepository.find({
          relations: ['brand', 'reward'],
          where: {
            status: ItemStatus.ACTIVE,
            expired: false,
            ...(reward && { token: { rewardId: reward } }),
            ...(brand && { brand_id: brand }),
            ...(type && { task_type: type }),
          },
          skip: +page === 1 ? 0 : (+page - 1) * limit,
          take: limit ? limit : 10,
          order: {
            createdAt: sort ? sort.order : 'DESC',
          },
        });
      }

      const count = await this.taskRepository.count({
        where: {
          expired: false,
          status: ItemStatus.ACTIVE,
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
        tasks: tasks as Task[],
        pagination,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getTaskById(id: string) {
    const task = await this.taskRepository.findOne({
      relations: ['brand', 'reward'],
      where: {
        id,
        status: ItemStatus.ACTIVE,
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

  async getUsersTasks(userId: string, page: number, limit: number) {
    page = page ? page : 1;

    const tasks = await this.taskResponder.find({
      relations: ['task', 'task.brand', 'task.token', 'task.token.reward'],
      where: {
        userId,
      },
      skip: +page === 1 ? 0 : (+page - 1) * limit,
      take: limit ? limit : 10,
    });

    const count = await this.taskResponder.count({
      where: {
        userId,
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
      tasks: tasks as TaskResponder[],
      pagination,
    };
  }

  async getUsersSingleTasks(userId: string, taskId: string) {
    const task = await this.taskResponder.findOne({
      relations: ['task', 'task.brand', 'task.reward'],
      where: {
        userId,
        taskId,
      },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  async getWinners(taskId: string, page: number, limit: number): Promise<any> {
    page = page ? page : 1;

    const winners = await this.taskResponder.find({
      where: {
        taskId,
        winner: true,
      },
      relations: ['user'],
      select: {
        user: {
          username: true,
          customer: {
            name: true,
            profilePicture: true,
          },
        },
      },
      skip: +page === 1 ? 0 : (+page - 1) * limit,
      take: limit ? limit : 10,
    });

    const count = await this.taskResponder.count({
      where: {
        taskId,
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
      winners: winners as TaskResponder[],
      pagination,
    };
  }

  async joinTask(task_id: string, user_id: string) {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id: task_id,
        },
      });

      if (!task) {
        throw new HttpException('Task not found', 400);
      }

      if (task?.status !== ItemStatus.ACTIVE) {
        throw new HttpException('Task is not active', 400);
      }

      const availableTaskTypes = [
        AllTaskTypes.OUT_BRAND_TAGGING,
        AllTaskTypes.OUT_SM_FOLLOW,
        AllTaskTypes.OUT_LIKE_POST,
        AllTaskTypes.OUT_REPOST,
      ];

      const user = await this.userService.getUserById(user_id);

      const isTaskInAvailableTaskTypes =
        availableTaskTypes.filter((type) => type === task?.taskType).length > 0;

      console.log(isTaskInAvailableTaskTypes, user_id);

      if (
        availableTaskTypes.filter((type) => type === task?.taskType).length >
          0 &&
        !user?.twitterAuth?.username
      ) {
        throw new HttpException(
          'Please connect your twitter account to join this task',
          400,
        );
      }

      // check if current date is within the time frame
      const isValid = moment().isBetween(
        moment(task?.createdAt).subtract(1, 'hours'),
        moment(task?.startDate).add(task?.timeFrameInHours, 'hours'),
      );

      if (!isValid) {
        throw new HttpException('Task is no longer active', 400);
      }

      // check if responses is times 2 of number of possible winners
      const responses = await this.taskResponder.count({
        where: {
          taskId: task_id,
          taskCancelled: false,
        },
      });

      if (responses >= task?.numberOfWinners * 2) {
        throw new HttpException('Task is no longer active', 400);
      }

      const checkResponser = await this.taskResponder.findOne({
        where: {
          taskId: task_id,
          userId: user_id,
        },
      });

      if (checkResponser?.taskCancelled) {
        checkResponser.taskCancelled = false;
        checkResponser.currentStep = 1;
        return await this.taskResponder.save(checkResponser);
      }

      if (checkResponser) {
        throw new HttpException('You have already joined this task', 400);
      }

      const taskResponse = new TaskResponder();
      taskResponse.taskId = task_id;
      taskResponse.userId = user_id;

      const response = await this.taskResponder.save(taskResponse);

      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async moveToSecondStep(user_id: string, task_id: string) {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id: task_id,
        },
      });

      if (!task) {
        throw new HttpException('Task not found', 400);
      }

      if (task.status !== ItemStatus.ACTIVE) {
        throw new HttpException('Task is not active', 400);
      }

      // check if current date is within the time frame
      const isValid = moment().isBetween(
        moment(task.createdAt).subtract(1, 'hours'),
        moment(task.startDate).add(task.timeFrameInHours, 'hours'),
      );

      if (!isValid) {
        throw new HttpException('Task is no longer active', 400);
      }

      // check if responses is times 2 of number of possible winners
      const responses = await this.taskResponder.count({
        where: {
          taskId: task_id,
          taskCancelled: false,
        },
      });

      if (responses >= task.numberOfWinners * 2) {
        throw new HttpException('Task is no longer active', 400);
      }

      const checkResponser = await this.taskResponder.findOne({
        where: {
          taskId: task_id,
          userId: user_id,
        },
      });

      if (!checkResponser) {
        throw new Error('You have not joined the task');
      }

      if (checkResponser?.taskPerformed) {
        throw new Error('Task already done.');
      }

      checkResponser.currentStep = 2;

      const response = await this.taskResponder.save(checkResponser);

      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async create(data: Task) {
    try {
      const task = this.taskRepository.create(data);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: string, data: Task) {
    const task = await this.taskRepository.findOneBy({ id });

    if (
      task.status === ItemStatus.ACTIVE ||
      task.status === ItemStatus.COMPLETED
    ) {
      throw new Error('Task is already active or completed');
    }

    await this.taskRepository.update(id, data);
    return await this.taskRepository.findOneBy({ id });
  }

  async updateStatus(id: string, status: ItemStatus) {
    const task = await this.taskRepository.findOneBy({ id });

    if (task.status === ItemStatus.PENDING) {
      throw new HttpException('Task is still pending', 400);
    }

    if (task.status === ItemStatus.COMPLETED) {
      throw new HttpException('Task is already completed', 400);
    }

    await this.taskRepository.update(id, {
      status,
    });
    return await this.taskRepository.findOneBy({ id });
  }

  async updateReport(id: string, data: Task) {
    const task = await this.taskRepository.findOneBy({ id });

    if (task.status === ItemStatus.PENDING) {
      throw new HttpException('Task is still pending', 400);
    }

    if (task.status === ItemStatus.COMPLETED) {
      throw new HttpException('Task is already completed', 400);
    }

    await this.taskRepository.update(id, data);
    return await this.taskRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const task = await this.taskRepository.findOneBy({ id });

    if (
      task.status === ItemStatus.ACTIVE ||
      task.status === ItemStatus.COMPLETED
    ) {
      throw new HttpException('Task is already active or completed', 400);
    }

    await this.taskRepository.delete(id);
    return { deleted: true };
  }

  async respondToTask(data: {
    task_id: string;
    user_id: string;
    wallet_address: string;
    response: string;
    response_type: string;
    response_url: string;
  }) {
    try {
      const task = await this.taskRepository.findOneBy({
        id: data.task_id,
        status: ItemStatus.ACTIVE,
      });

      if (!task) {
        throw new HttpException('Task is not active', 400);
      }

      // check if current date is within the time frame
      const isValid = moment().isBetween(
        moment(task.createdAt).subtract(1, 'hours'),
        moment(task.startDate).add(task.timeFrameInHours, 'hours'),
      );

      if (!isValid) {
        throw new HttpException('Task is no longer active', 400);
      }

      // check if user joined the task
      const userJoinedTask = await this.taskResponder.findOne({
        where: {
          taskId: data.task_id,
          userId: data.user_id,
        },
      });

      if (!userJoinedTask) {
        throw new HttpException('Please join task', 400);
      }

      const userHasResponded = await this.taskResponseRepository.findOne({
        where: {
          userId: data.user_id,
          taskId: data.task_id,
        },
      });

      const walletHasResponded = await this.taskResponseRepository.findOne({
        where: {
          walletAddress: data.wallet_address,
          taskId: data.task_id,
        },
      });

      if (walletHasResponded) {
        throw new HttpException('User has already responded', 400);
      }

      if (userHasResponded) {
        throw new HttpException('User has already responded', 400);
      }

      const taskResponse = this.taskResponseRepository.create({
        taskId: data.task_id,
        userId: data.user_id,
        walletAddress: data.wallet_address,
        response: data.response,
        responseType: data.response_type,
        responseUrl: data.response_url,
      });
      return await this.taskResponseRepository.save(taskResponse);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getTaskManifestDetails(url: string) {
    try {
      const manifest = await this.taskResponseRecordRepo.findOne({
        where: { manifestUrl: url },
      });

      if (!manifest) {
        throw new HttpException('Manifest not found', 404);
      }

      // get details from the manifest url
      const localUrl = `./public/uploads/manifests/${manifest.manifestHash}.json`;
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
        where: { manifestUrl: url },
      });

      if (!manifest) {
        throw new HttpException('Manifest not found', 404);
      }

      // get details from the manifest url
      const localUrl = `./public/uploads/manifests/${manifest.manifestHash}.json`;
      const data = await readFile(localUrl, 'utf8');

      const mani = JSON.parse(data);

      mani.status = 'COMPLETED';

      // create a manifest file with body data and save to public folder
      const manifestData = JSON.stringify(mani);
      writeFile(
        `./public/uploads/manifests/${manifest.manifestHash}.json`,
        manifestData,
        'utf8',
      );

      return 'Manifest updated';
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async storeNewResponse(data: {
    worker_address: string;
    escrow_address: string;
    responses: string[];
  }) {
    try {
      const taskRecord = await this.taskResponseRecordRepo.findOne({
        where: {
          escrowAddress: data.escrow_address,
        },
      });

      if (!taskRecord) {
        throw new HttpException('Task record (Job) not found', 404);
      }

      const checkIfSubmitted = await this.jobResponseRepo.findOne({
        where: {
          workerAddress: data.worker_address,
          taskRecordId: taskRecord.id,
        },
      });

      if (checkIfSubmitted) {
        throw new HttpException('Worker has already submitted', 400);
      }

      const job = new JobResponse();
      job.workerAddress = data.worker_address;
      job.escrowAddress = data.escrow_address;
      job.taskRecordId = taskRecord.id;
      job.response = data.responses;

      await this.jobResponseRepo.save(job);

      return this.jobResponseRepo.count({
        where: {
          taskRecordId: taskRecord.id,
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
          escrowAddress: escrowAddress,
        },
      });

      if (!taskRecord) {
        throw new HttpException('Task record not found', 404);
      }

      const responses = await this.jobResponseRepo.find({
        where: {
          taskRecordId: taskRecord.id,
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
          escrowAddress: escrowAddress,
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
          escrowAddress: escrowAddress,
        },
      });

      if (!taskRecord) {
        throw new HttpException('Task record (Job) not found', 404);
      }

      const response = await this.jobResponseRepo.findOne({
        where: {
          workerAddress: workerAddress,
          taskRecordId: taskRecord.id,
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

  async completeUserTask(task_id: string, user_id: string) {
    const task = await this.taskRepository.findOneBy({ id: task_id });

    if (!task) {
      throw new HttpException('Task not found', 404);
    }

    const response = await this.taskResponder.findOne({
      where: {
        userId: user_id,
        taskId: task_id,
      },
      relations: ['user'],
    });

    if (!response) {
      throw new HttpException('Please join task first.', 400);
    }

    if (response.taskCancelled) {
      throw new HttpException('Task was cancelled.', 400);
    }

    if (response.taskPerformed) {
      throw new HttpException('Task already completed.', 400);
    }

    // TODO: validate response

    // await this.validateResponse(task, response);

    return 'Task completed successfully.';
  }
}
