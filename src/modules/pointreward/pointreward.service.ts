import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import slugify from 'slugify';
import { PointsReward } from './model/pointreward.entity';
import { RewardType } from '../reward/interfaces/reward.inteface';
import { CreatePointsRewardDto } from './dto/create-pointsreward.dto';

@Injectable()
export class PointsrewardService {
  constructor() {}

  // async create(rewardPoint: CreatePointsRewardDto): Promise<PointsReward> {
  //   const newPointsReward: PointsReward = new PointsReward();

  //   newPointsReward.brandName = rewardPoint.brandName;
  //   newPointsReward.pointsrewardId = uuidV4();
  //   newPointsReward.rewardId = rewardPoint.rewardId;
  //   newPointsReward.rewardName = rewardPoint.rewardName;
  //   newPointsReward.rewardNameSlug = rewardPoint.rewardNameSlug;
  //   newPointsReward.syncApiAddress = rewardPoint.syncApiAddress;
  //   newPointsReward.syncApiAccessToken = rewardPoint.syncApiAccessToken;
  //   newPointsReward.syncApiRefreshToken = rewardPoint.syncApiRefreshToken;

  //   return this.pointsRewardService.save(newPointsReward);
  // }

  // async findOneRewardByName(name: string): Promise<any> {
  //   const slug = slugify(name).toLowerCase();
  //   return this.pointsRewardService.findOneBy({ rewardNameSlug: slug });
  // }

  // async findOneRewardById(id: string): Promise<PointsReward> {
  //   return this.pointsRewardService.findOne({
  //     where: {
  //       rewardId: id,
  //       reward: {
  //         rewardType: RewardType.REGULARPOINTS,
  //       },
  //     },
  //     relations: ['reward', 'reward.brand'],
  //   });
  // }

  // async update(id: string, body: any): Promise<any> {
  //   return this.pointsRewardService.update(
  //     {
  //       rewardId: id,
  //     },
  //     body,
  //   );
  // }
}
