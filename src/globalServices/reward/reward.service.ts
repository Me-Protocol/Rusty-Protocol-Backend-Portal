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

    return rewardRec;
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
    const rewards = this.rewardsRepo
      .createQueryBuilder('reward')
      .leftJoinAndSelect('reward.brand', 'brand');

    if (category_id) {
      rewards.andWhere('brand.categoryId = :category_id', { category_id });
    }

    if (brand_id) {
      rewards.andWhere('brand.id = :brand_id', { brand_id });
    }

    if (reward_type) {
      rewards.andWhere('reward.rewardType = :reward_type', { reward_type });
    }

    rewards.skip((page - 1) * limit).take(limit);

    const rewardsRec = await rewards.getMany();

    const total = await rewards.getCount();

    return {
      total,
      rewards: rewardsRec,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  async findOneRewardBySlug(slug: string): Promise<Reward> {
    return this.rewardsRepo.findOneBy({ slug: slug });
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

  async getRegistryByIdentifer(identifier: string, rewardId: string) {
    const reward = await this.rewardsRepo.findOneBy({
      id: rewardId,
    });

    const rewardPoint = reward.syncData?.find((sync) => {
      // @ts-ignore
      const newSynC = JSON.parse(sync);
      return newSynC.identifier === identifier;
    });

    return rewardPoint
      ? JSON.parse(
          // @ts-ignore
          rewardPoint,
        )
      : null;
  }
}
