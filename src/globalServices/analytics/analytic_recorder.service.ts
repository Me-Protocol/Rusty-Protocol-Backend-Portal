import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardCirculation } from './entities/reward_circulation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsRecorderService {
  constructor(
    @InjectRepository(RewardCirculation)
    private readonly offerRepo: Repository<RewardCirculation>,
  ) {}

  async createRewardCirculation(body: RewardCirculation) {
    return await this.offerRepo.save(body);
  }
}
