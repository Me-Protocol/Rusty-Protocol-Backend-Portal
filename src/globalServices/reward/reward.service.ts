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

  async create(reward: Reward): Promise<Reward> {
    const createReward = this.rewardsRepo.create(reward);
    const rewardRec = await this.save(createReward);
    this.elasticIndex.insertDocument(rewardRec, rewardIndex);
    return rewardRec;
  }

  async save(reward: Reward): Promise<Reward> {
    const rewardRec = await this.rewardsRepo.save(reward);
    this.elasticIndex.updateDocument(rewardRec, rewardIndex);

    return reward;
  }

  async findAll({
    category_id,
    brand_id,
    reward_type,
    page,
    limit,
  }: {
    category_id: string;
    brand_id: string;
    reward_type: RewardType;
    page: number;
    limit: number;
  }) {
    const rewards = this.rewardsRepo.find({
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
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.rewardsRepo.count({
      where: {
        brand: {
          category: {
            id: category_id,
          },
          id: brand_id,
        },
        rewardType: reward_type,
      },
    });

    return {
      total,
      rewards,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  async findOneRewardByLabel(label: string): Promise<Reward> {
    const rewardSlug = slugify(label).toLowerCase();
    return this.rewardsRepo.findOneBy({ slug: rewardSlug });
  }

  async delete(rewardId: string, brandId: string): Promise<boolean> {
    await this.rewardsRepo.delete({ id: rewardId, brandId: brandId });

    this.elasticIndex.deleteDocument(rewardIndex, rewardId);

    return true;
  }

  async findOneById(id: string): Promise<Reward> {
    return this.rewardsRepo.findOneBy({ id: id });
  }

  async findOneByIdAndBrand(id: string, brandId: string): Promise<Reward> {
    return this.rewardsRepo.findOneBy({ id: id, brandId: brandId });
  }
}
