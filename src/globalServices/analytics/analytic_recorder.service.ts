import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardCirculation } from './entities/reward_circulation';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsRecorderService {
  constructor(
    @InjectRepository(RewardCirculation)
    private readonly offerRepo: Repository<RewardCirculation>,
  ) {}

  async createRewardCirculation(body: RewardCirculation) {
    const rewardCirculation = new RewardCirculation();
    rewardCirculation.brandId = body.brandId;
    rewardCirculation.circulatingSupply = body.circulatingSupply;
    rewardCirculation.totalDistributedSupplyAtCirculation =
      body.totalDistributedSupplyAtCirculation;
    rewardCirculation.totalRedeemedAtCirculation =
      body.totalRedeemedAtCirculation;

    return await this.offerRepo.save(rewardCirculation);
  }
}
