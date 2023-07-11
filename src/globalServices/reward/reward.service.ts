import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { BrandService } from '../brand/brand.service';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { Reward } from './entities/reward.entity';
import { RewardType } from '@src/utils/enums/RewardType';
import { rewardIndex } from '@src/modules/search/interface/search.interface';

@Injectable()
export class RewardService {
  constructor(
    private readonly elasticIndex: ElasticIndex,

    @InjectRepository(Reward)
    private readonly rewardsRepo: Repository<Reward>,
  ) {}

  async save(reward: Reward): Promise<Reward> {
    const createReward = this.rewardsRepo.create(reward);
    return await this.rewardsRepo.save(createReward);
  }

  async findAll(
    category_id: string,
    brand_id: string,
    reward_type: RewardType,
  ): Promise<Reward[]> {
    return this.rewardsRepo.find({
      where: {
        brand: {
          category: {
            id: category_id,
          },
          id: brand_id,
        },
        rewardType: reward_type,
      },
      relations: ['brand'],
    });
  }

  async findOneRewardByLabel(label: string): Promise<Reward> {
    const rewardSlug = slugify(label).toLowerCase();
    return this.rewardsRepo.findOneBy({ slug: rewardSlug });
  }

  /**
   * delete a reward
   * @param rewardId
   * @returns boolean
   */
  async delete(rewardId: string): Promise<boolean> {
    await this.rewardsRepo.delete({ id: rewardId });

    this.elasticIndex.deleteDocument(rewardIndex, Number(rewardId));

    return true;
  }

  async findOneById(id: string): Promise<Reward> {
    return this.rewardsRepo.findOneBy({ id: id });
  }
}
