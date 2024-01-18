/* eslint-disable prefer-const */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';
import { Cron, CronExpression } from '@nestjs/schedule';
import { writeFile, readFile } from 'fs/promises';
import { HttpService } from '@nestjs/axios';
import { Wallet, ethers, providers } from 'ethers';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Task } from './entities/task.entity';
import { TaskResponse } from './entities/taskResponse.entity';
import { Reward } from '../reward/entities/reward.entity';
import { BountyRecord } from './entities/bountyRecord.entity';
import { Brand } from '../brand/entities/brand.entity';
import { TaskResponseRecord } from './entities/taskResponseRecord.entity';
import { JobResponse } from './entities/jobResponse.entity';
import { TaskResponder } from './entities/taskResponder.entity';
import { RewardService } from '../reward/reward.service';
import { BrandService } from '../brand/brand.service';
import { FollowService } from '../follow/follow.service';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import { InAppTaskVerifier } from './common/verifier/inapp.service';
import { TwitterTaskVerifier } from './common/verifier/outapp/twitter.verifier';
import { AllTaskTypes, TaskStatus } from '@src/utils/enums/TasksTypes';
import {
  CreateTaskDto,
  FilterTaskDto,
  JobResponseDto,
  UpdateReportDto,
  UpdateStatusDto,
  UpdateTaskDto,
  UpdateTaskResponseDto,
} from '@src/modules/taskModule/dtos/tasks.dto';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationType } from '@src/utils/enums/notification.enum';
import { emailButton } from '@src/utils/helpers/email';
import { CLIENT_APP_URI } from '@src/config/env.config';
import { RewarderService } from './common/rewarder/rewarder.service';
export const { TASK_QUEUE } = process.env;

// const humanJobWinnerCount = parseInt(process.env.HUMAN_JOB_WINNER_COUNT);

// const provider = new providers.JsonRpcProvider(process.env.PROVIDER_URI!);
// const signer = new Wallet(process.env.ETH_PRIVATE_KEY!, provider);

//TODO: get token decimal before payout
//TODO: make all external tasks stable
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(TaskResponse)
    private taskResponseRepository: Repository<TaskResponse>,

    @InjectRepository(Reward)
    private tokenRepo: Repository<Reward>,

    @InjectRepository(BountyRecord)
    private bountyRecordRepo: Repository<BountyRecord>,

    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,

    @InjectRepository(TaskResponseRecord)
    private taskResponseRecordRepo: Repository<TaskResponseRecord>,

    @InjectRepository(JobResponse)
    private jobResponseRepo: Repository<JobResponse>,

    @InjectRepository(TaskResponder)
    private taskResponder: Repository<TaskResponder>,

    private readonly httpService: HttpService,

    private readonly rewardService: RewardService,

    private readonly brandService: BrandService,

    private readonly followService: FollowService,

    private readonly notificationService: NotificationService,

    private readonly userService: UserService,

    private inAppTaskVerifier: InAppTaskVerifier,

    private readonly twitterTaskVerifier: TwitterTaskVerifier,

    private readonly rewarderService: RewarderService,

    @InjectQueue(TASK_QUEUE)
    private readonly taskQueue: Queue,
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
        status: TaskStatus.PENDING,
        reward: {
          contractAddress,
        },
      },
    });

    if (nextTask) {
      await this.taskRepository.update(nextTask.id, {
        status: TaskStatus.ACTIVE,
        startDate: new Date(),
      });
      console.log('TASK IS NOW ACTIVE');
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
    return await this.bountyRecordRepo.save(bountyRecord);
  }

  async getBrandTasks(brandId: string) {
    const tasks = await this.taskRepository.find({
      relations: ['brand', 'reward'],
      where: {
        brandId,
      },
    });

    return tasks;
  }

  async findActiveTasks({
    rewardId,
    page,
    limit,
    type,
    brandId,
    sort,
  }: FilterTaskDto) {
    try {
      const checkReward = await this.rewardService.findOneById(rewardId);

      if (rewardId && !checkReward) {
        throw new HttpException('Reward not found', 400);
      }

      const checkBrand = await this.brandService.getBrandById(brandId);

      if (brandId && !checkBrand) {
        throw new HttpException('Brand not found', 400);
      }

      const taskQuery = this.taskRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.brand', 'brand')
        .leftJoinAndSelect('task.reward', 'reward')
        .leftJoinAndSelect('task.offer', 'offer')
        .where('task.status = :status', { status: TaskStatus.ACTIVE });

      if (rewardId) {
        taskQuery.andWhere('task.rewardId = :rewardId', { rewardId });
      }

      if (brandId) {
        taskQuery.andWhere('task.brandId = :brandId', { brandId });
      }

      if (type) {
        taskQuery.andWhere('task.taskType = :type', { type });
      }

      if (sort) {
        if (sort.order === 'ASC') {
          taskQuery.orderBy('task.price', 'ASC');
        } else if (sort.order === 'DESC') {
          taskQuery.orderBy('task.price', 'DESC');
        }

        if (sort.expiring) {
          taskQuery.andWhere('task.expired = :expired', { expired: false });
          // timeFrameInHours less than 24 hours
          taskQuery.andWhere('task.timeFrameInHours < :timeFrameInHours', {
            timeFrameInHours: 24,
          });
        }

        if (sort.trending) {
          taskQuery.orderBy('task.viewCount', 'DESC');
        }

        if (sort.minPrice) {
          taskQuery.andWhere('task.price >= :minPrice', {
            minPrice: sort.minPrice,
          });
        }

        if (sort.maxPrice) {
          taskQuery.andWhere('task.price <= :maxPrice', {
            maxPrice: sort.maxPrice,
          });
        }
      }

      const tasks = await taskQuery
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      const count = await taskQuery.getCount();

      return {
        tasks,
        page: page ? +page : 1,
        nextPage: Math.ceil(count / limit) > +page ? +page + 1 : null,
        prevPage: +page === 1 ? null : +page - 1,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getTaskById(id: string) {
    const task = await this.taskRepository.findOne({
      relations: ['brand', 'reward', 'offer'],
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

  async getUsersTasks(userId: string, page: number, limit: number) {
    page = page ? page : 1;

    const tasks = await this.taskResponder.find({
      relations: ['task', 'task.brand', 'task.reward'],
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

    return {
      tasks: tasks,
      nextPage: Math.ceil(count / limit) > page ? page + 1 : null,
      previousPage: page === 1 ? null : page - 1,
    };
  }

  async getUsersSingleTasks(userId: string, taskId: string) {
    const task = await this.taskResponder.findOne({
      relations: ['task', 'task.brand', 'task.reward', 'task.offer'],
      where: {
        userId,
        taskId,
      },
    });

    if (!task) {
      throw new HttpException('Task not found', 404);
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
      relations: ['user', 'user.customer'],
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

    return {
      winners: winners,
      nextPage: Math.ceil(count / limit) > page ? page + 1 : null,
      prevPage: page === 1 ? null : page - 1,
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

      if (task?.status !== TaskStatus.ACTIVE) {
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

      if (isTaskInAvailableTaskTypes && !user?.twitterAuth?.username) {
        throw new HttpException(
          'Please connect your twitter account to join this task',
          400,
        );
      }

      console.log(task);

      if (task.expired) {
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

  async cancelledTask(user_id: string, task_id: string) {
    const taskResponder = await this.taskResponder.findOne({
      where: {
        taskId: task_id,
        userId: user_id,
      },
    });

    if (!taskResponder) {
      throw new HttpException("You haven't joined this task", 400);
    }

    taskResponder.taskCancelled = true;

    return await this.taskResponder.save(taskResponder);
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

      if (task.status !== TaskStatus.ACTIVE) {
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
        throw new HttpException('You have not joined the task', 400);
      }

      if (checkResponser?.taskPerformed) {
        throw new HttpException('Task already done.', 400);
      }

      checkResponser.currentStep = 2;

      const response = await this.taskResponder.save(checkResponser);

      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async create(data: CreateTaskDto) {
    try {
      const band_id = data.brand_id;

      const reward = await this.tokenRepo.findOne({
        where: {
          id: data.reward_token_id,
          brandId: band_id,
        },
      });

      if (!reward) {
        throw new HttpException('Reward not found', 400);
      }

      data.reward_token_id = reward.id;

      const task = new Task();
      task.brandId = band_id;
      task.rewardId = data.reward_token_id;
      task.taskType = data.task;
      task.description = data.description;
      task.validation = data.validation;
      task.timeFrameInHours = data.time_frame_in_hours;
      task.numberOfWinners = data.number_of_winners;
      task.price = data.price;
      task.price_breakdown = data.price_breakdown;
      task.title = data.title;
      task.description = data.description;
      task.offerId = data.offer_id;
      task.tagPlatform = data.tag_platform;
      task.socialHandle = data.social_handle;
      task.socialPost = data.social_post;

      return await this.taskRepository.save(task);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: string, data: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id });

    if (
      task.status === TaskStatus.ACTIVE ||
      task.status === TaskStatus.COMPLETED
    ) {
      throw new HttpException('Task is already active or completed', 400);
    }

    if (task.brandId !== data.brand_id) {
      throw new HttpException('Brand cannot be changed', 401);
    }

    await this.taskRepository.update(id, data);
    return await this.taskRepository.findOneBy({ id });
  }

  async updateStatus(id: string, data: UpdateStatusDto) {
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

  async remove(id: string) {
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

  async completeUserTask(task_id: string, user_id: string) {
    try {
      const task = await this.taskRepository.findOneBy({ id: task_id });

      if (!task) {
        throw new HttpException('Task not found', 404);
      }

      const response = await this.taskResponder.findOne({
        where: {
          userId: user_id,
          taskId: task_id,
        },
        relations: ['user', 'user.customer'],
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

      await this.validateResponse(task, response);

      return {
        message: 'Task completed successfully.',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  private async completeTaskVerifier(
    activeTask: Task,
    response: TaskResponder,
  ) {
    try {
      // TODO: Add task queue
      // const queuedJob: any = await this.taskQueue.add({
      //   activeTask,
      //   response,
      // });

      // const job = await this.taskQueue.getJob(queuedJob.id);
      // const isFinishedValue = await job.finished();

      // if (isFinishedValue) return isFinishedValue;

      await this.taskRepository.update(activeTask.id, {
        winnerCount: activeTask.winnerCount + 1,
      });

      response.taskPerformed = true;
      response.currentStep = 3;
      response.winner = true;

      const amount = ethers.utils.parseEther(activeTask.price.toString());

      const user = await this.userService.getUserById(response.userId);

      if (user.customer.walletAddress && !response.rewardClaimed) {
        await this.rewarderService.sendReward({
          addresses: [user.customer.walletAddress],
          amounts: [amount],
          rewardId: activeTask.rewardId,
        });

        response.rewardClaimed = true;
      }

      return await this.taskResponder.save(response);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getTaskWinners(taskId: string) {
    return await this.taskResponder.find({
      where: {
        taskId,
        taskCancelled: false,
        taskPerformed: true,
        winner: true,
      },
    });
  }

  private async validateResponse(activeTask: Task, response: TaskResponder) {
    const availableTaskTypes = [
      AllTaskTypes.IN_APP_FOLLOW,
      AllTaskTypes.IN_APP_PRODUCT_LIKE,
      AllTaskTypes.OUT_SM_FOLLOW,
      AllTaskTypes.OUT_BRAND_TAGGING,
      AllTaskTypes.OUT_LIKE_POST,
      AllTaskTypes.OUT_REPOST,
    ];

    if (availableTaskTypes.includes(activeTask.taskType)) {
      if (activeTask.taskType === AllTaskTypes.IN_APP_FOLLOW) {
        //select task responder winners
        const taskWinners = await this.getTaskWinners(activeTask.id);
        if (taskWinners.length >= activeTask.numberOfWinners) {
          //expire tasks
          await this.taskRepository.update(activeTask.id, {
            expired: true,
          });

          throw new Error('Sorry winners already selected for this task');
        } else {
          const check = await this.inAppTaskVerifier.verifyUserFollowsBrand(
            activeTask.brandId,
            response.userId,
          );

          if (!check)
            throw new Error(
              'We could not validate your response. Please try again',
            );

          return await this.completeTaskVerifier(activeTask, response);
        }
      }

      if (activeTask.taskType === AllTaskTypes.IN_APP_PRODUCT_LIKE) {
        //select task responder winners
        console.log('IN APP PRODUCT LIKE');

        const taskWinners = await this.getTaskWinners(activeTask.id);
        if (taskWinners.length >= activeTask.numberOfWinners) {
          //expire tasks
          await this.taskRepository.update(activeTask.id, {
            expired: true,
          });

          throw new Error('Sorry winners already selected for this task');
        } else {
          const check = await this.inAppTaskVerifier.verifyUserLikedAnOffer(
            activeTask.offerId,
            response.userId,
          );

          if (!check)
            throw new Error(
              'We could not validate your response. Please try again',
            );

          return await this.completeTaskVerifier(activeTask, response);
        }
      }

      if (activeTask.taskType === AllTaskTypes.OUT_SM_FOLLOW) {
        const taskWinners = await this.getTaskWinners(activeTask.id);

        if (taskWinners.length >= activeTask.numberOfWinners) {
          //expire tasks
          await this.taskRepository.update(activeTask.id, {
            expired: true,
          });

          throw new Error('Sorry winners already selected for this task');
        } else {
          const check =
            await this.twitterTaskVerifier.checkIfUserIsFollowingBrandOnTwitter(
              {
                user_twitter_name: response.user?.twitterAuth?.username,
                brandTwitterName: activeTask.socialHandle,
                accessToken: response.user?.twitterAuth?.accessToken,
                accessTokenSecret: response.user?.twitterAuth?.refreshToken,
              },
            );

          if (!check) throw new Error('We could not validate your response');

          return await this.completeTaskVerifier(activeTask, response);
        }
      }

      if (activeTask.taskType === AllTaskTypes.OUT_BRAND_TAGGING) {
        //select task responder winners

        const taskWinners = await this.getTaskWinners(activeTask.id);

        if (taskWinners.length >= activeTask.numberOfWinners) {
          await this.taskRepository.update(activeTask.id, {
            expired: true,
          });

          throw new Error('Sorry! winners already selected for this task');
        } else {
          const responseData = await this.taskResponseRepository.findOne({
            where: {
              userId: response.userId,
              taskId: activeTask.id,
            },
          });

          const responseUrl = responseData.responseUrl;

          const tweetId = responseUrl.split('/').pop();

          const check =
            await this.twitterTaskVerifier.checkIfUserTaggedBrandOnTwitter(
              activeTask.socialHandle,
              tweetId,
            );

          if (!check) throw new Error('We could not validate your response');

          return await this.completeTaskVerifier(activeTask, response);
        }
      }

      if (activeTask.taskType === AllTaskTypes.OUT_LIKE_POST) {
        const tweetId = activeTask.socialPost?.split('/').pop();

        //select task responder winners

        const taskWinners = await this.getTaskWinners(activeTask.id);

        if (taskWinners.length >= activeTask.numberOfWinners) {
          await this.taskRepository.update(activeTask.id, {
            expired: true,
          });

          throw new Error('Sorry winners already selected for this task');
        } else {
          const check =
            await this.twitterTaskVerifier.checkIfUserLikesPostOnTwitter(
              response.user?.twitterAuth?.username,
              tweetId,
            );

          if (!check)
            throw new Error(
              'We could not validate your response. Please try again',
            );

          return await this.completeTaskVerifier(activeTask, response);
        }
      }

      if (activeTask.taskType === AllTaskTypes.OUT_REPOST) {
        const tweetId = activeTask.socialPost?.split('/').pop();

        //select task responder winners

        const taskWinners = await this.getTaskWinners(activeTask.id);

        if (taskWinners.length >= activeTask.numberOfWinners) {
          //expire tasks
          await this.taskRepository.update(activeTask.id, {
            expired: true,
          });

          throw new Error('Sorry winners already selected for this task');
        } else {
          const check =
            await this.twitterTaskVerifier.checkIfUserRepostedPostOnTwitter(
              response.user?.twitterAuth?.username,
              tweetId,
            );

          if (!check) throw new Error('We could not validate your response');

          const queuedJob: any = await this.taskQueue.add({
            activeTask,
            response,
          });

          const job = await this.taskQueue.getJob(queuedJob.id);
          const isFinishedValue = await job.finished();

          if (isFinishedValue) return isFinishedValue;

          await this.taskRepository.update(activeTask.id, {
            winnerCount: activeTask.winnerCount + 1,
          });

          response.taskPerformed = true;
          response.currentStep = 3;
          response.winner = true;

          return await this.taskResponder.save(response);
        }
      }

      // if (activeTask.taskType === AllTaskTypes.IN_APP_REVIEW) {
      //   const taskWinners = await this.getTaskWinners(activeTask.id);

      //   if (taskWinners.length >= activeTask.numberOfWinners) {
      //     //expire tasks
      //     await this.taskRepository.update(activeTask.id, {
      //       expired: true,
      //     });

      //     throw new Error('Sorry winners already selected for this task');
      //   } else {
      //     const check = await this.inAppTaskVerifier.verifyUserReviewedOffer(
      //       activeTask.offerId,
      //       response.userId,
      //     );

      //     if (!check) throw new Error('We could not validate your response');
      //   }
      // }
    } else {
      throw new Error(
        "We couldn't validate your response. Please try again later.",
      );
    }
  }
}
