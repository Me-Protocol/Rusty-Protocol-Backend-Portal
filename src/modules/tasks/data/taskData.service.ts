import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Between, LessThan, Repository } from 'typeorm';
import { AllTaskTypes, TaskStatus } from '@src/utils/enums/TasksTypes';
import { TaskDataEntity } from '../model/tasks.entity';
import {
  CreateTaskDto,
  FilterTaskDto,
  JobResponseDto,
  UpdateReportDto,
  UpdateStatusDto,
  UpdateTaskDto,
  UpdateTaskResponseDto,
} from '../dtos/tasks.dto';
import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidV4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { TasksResultService } from '../common/verifier/verifier.service';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { TaskResponseRecord } from '@src/models/taskResponseRecord.entity';
import { HttpService } from '@nestjs/axios';
import { UserService } from '@src/globalServices/user/user.service';
import { TokenReward } from '@src/modules/tokenreward/models/tokenreward.entity';
import { TaskResponse } from '@src/models/taskResponse.entity';

//TODO: reward service

@Injectable()
export class TaskDataService {
  constructor(
    @InjectRepository(TaskDataEntity)
    private taskRepository: Repository<TaskDataEntity>,

    @InjectRepository(TaskResponse)
    private taskResponseRepository: Repository<TaskResponse>, // @InjectRepository(TokenReward)

    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,

    @InjectRepository(TaskResponseRecord)
    private taskResponseRecordRepo: Repository<TaskResponseRecord>, //  private tokenRepo: Repository<TokenReward>,

    private readonly httpService: HttpService,

    private readonly userService: UserService,

    @InjectRepository(TokenReward)
    private tokenRepo: Repository<TokenReward>,

    private readonly tasksResultService: TasksResultService, // @InjectRepository(BountyRecord) // private bountyRecordRepo: Repository<BountyRecord>, // @InjectRepository(JobResponseEntity) // private jobResponseRepo: Repository<JobResponseEntity>, // @InjectRepository(TaskResponderEntity) // private taskResponder: Repository<TaskResponderEntity>, // private configService: ConfigService, // private readonly rewardService: RewardsService, // private readonly brandService: BrandsService, // private readonly followService: FollowerService, // private readonly notificationService: NotificationService,
  ) {}

  async create(data: CreateTaskDto) {
    try {
      const band_id: any = data.brand_id;

      const brand = await this.brandRepo.findOneBy({ id: band_id });
      // const reward = await this.tokenRepo.findOne({
      //   where: {
      //     rewardId: data.reward_token_id,
      //   },
      // });

      if (!brand) {
        throw new HttpException('Brand not found', 400);
      }

      // if (!reward) {
      //   throw new HttpException('Reward not found', 400);
      // }

      // data.reward_token_id = reward.id;

      const task = this.taskRepository.create(data);
      return await this.taskRepository.save(task);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  // fetch based on contract address

  // async findNextTask(contractAddress: string) {
  //   const token = await this.tokenRepo.findOne({
  //     where: {
  //       contractAddress,
  //     },
  //   });

  //   if (!token) {
  //     // throw new HttpException('Token not found', 400);

  //     // create a bounty record

  //     await this.createABountyRecord(contractAddress);

  //     console.log('Token not found');

  //     return false;
  //   }

  //   console.log('TOKEN CONTRACT ADDRESS', token.contractAddress);

  //   const nextTask = await this.taskRepository.findOne({
  //     relations: ['brand', 'token'],
  //     order: {
  //       created_at: 'DESC',
  //     },
  //     where: {
  //       status: TaskStatus.PENDING,
  //       token: {
  //         contractAddress,
  //       },
  //     },
  //   });

  //   if (nextTask) {
  //     await this.taskRepository.update(nextTask.id, {
  //       status: TaskStatus.ACTIVE,
  //       start_date: new Date(),
  //     });
  //     console.log('TASK IS NOW ACTIVE');
  //   } else {
  //     // throw new HttpException(
  //     //   'No task for this reward yet',
  //     //   HttpStatus.NOT_FOUND,
  //     // );

  //     // create a bountyrecord
  //     await this.createABountyRecord(contractAddress);

  //     console.log('No task for this reward yet');

  //     return false;
  //   }
  // }

  // async createABountyRecord(contractAddress: string) {
  //   const bountyRecord = new BountyRecord();
  //   bountyRecord.contractAddress = contractAddress;
  //   return await this.bountyRecordRepo.save(bountyRecord);
  // }

  // async getBrandTasks(brandId: number) {
  //   const tasks = await this.taskRepository.find({
  //     relations: ['brand', 'token'],
  //     where: {
  //       brand_id: brandId,
  //     },
  //   });

  //   return tasks;
  // }
}
