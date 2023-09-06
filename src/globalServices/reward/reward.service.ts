import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { BrandService } from '../brand/brand.service';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { Reward } from './entities/reward.entity';
import { RewardType } from '@src/utils/enums/RewardType';
import { rewardIndex } from '@src/modules/search/interface/search.interface';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { KeyIdentifier } from './entities/keyIdentifier.entity';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';

@Injectable()
export class RewardService {
  constructor(
    private readonly elasticIndex: ElasticIndex,

    @InjectRepository(Reward)
    private readonly rewardsRepo: Repository<Reward>,

    @InjectRepository(KeyIdentifier)
    private readonly keyIdentifierRepo: Repository<KeyIdentifier>,
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
    page,
    limit,
  }: {
    category_id: string;
    brand_id: string;
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
    await this.rewardsRepo.softDelete({ id: rewardId, brandId: brandId });

    this.elasticIndex.deleteDocument(rewardIndex, rewardId);

    return true;
  }

  async findOneById(id: string): Promise<Reward> {
    return this.rewardsRepo.findOneBy({ id: id });
  }

  async findOneByIdAndBrand(id: string, brandId: string): Promise<Reward> {
    return this.rewardsRepo.findOneBy({ id: id, brandId: brandId });
  }

  async getRegistryByIdentifer(
    identifier: string,
    rewardId: string,
  ): Promise<{
    id: string;
    identifier: string;
    identifierType: SyncIdentifierType;
    amount: number;
  } | null> {
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

  getRewardByContractAddress(contractAddress: string) {
    return this.rewardsRepo.findOne({
      where: { contractAddress: contractAddress },
      relations: ['brand'],
    });
  }

  async createKeyIdentifer(
    keyIdentifier: KeyIdentifier,
  ): Promise<KeyIdentifier> {
    return this.keyIdentifierRepo.save(keyIdentifier);
  }

  async getKeyIdentifier(id: string, type: KeyIdentifierType) {
    return this.keyIdentifierRepo.findOne({
      where: {
        identifier: id,
        identifierType: type,
      },
    });
  }
}
