/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { Reward } from './entities/reward.entity';
import { rewardIndex } from '@src/modules/search/interface/search.interface';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { RewardStatus } from '@src/utils/enums/ItemStatus';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class RewardService {
  constructor(
    private readonly elasticIndex: ElasticIndex,

    @InjectRepository(Reward)
    private readonly rewardsRepo: Repository<Reward>,

    private readonly settingsService: SettingsService,
  ) {}

  async create(reward: Reward): Promise<Reward> {
    const settings = await this.settingsService.getPublicSettings();

    const createReward = this.rewardsRepo.create({
      ...reward,
      meAutoTopUpFactor: settings?.meAutoTopUpFactor,
      rewardAutoTopUpFactor: settings?.rewardAutoTopUpFactor,
    });
    const rewardRec = await this.save(createReward);
    this.elasticIndex.insertDocument(rewardRec, rewardIndex);

    return rewardRec;
  }

  async getDraftReward(brandId: string) {
    return this.rewardsRepo.findOne({
      where: {
        brandId,
        status: RewardStatus.DRAFT,
      },
    });
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
      .leftJoinAndSelect('reward.brand', 'brand')
      .where('reward.status = :status', { status: RewardStatus.PUBLISHED });

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
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async findOneRewardBySlug(slug: string): Promise<Reward> {
    return this.rewardsRepo.findOneBy({ slug: slug });
  }

  async findOneRewardByName(name: string): Promise<Reward> {
    return this.rewardsRepo.findOneBy({ rewardName: name });
  }

  async delete(rewardId: string, brandId: string): Promise<boolean> {
    await this.rewardsRepo.softDelete({ id: rewardId, brandId: brandId });

    this.elasticIndex.deleteDocument(rewardIndex, rewardId);

    return true;
  }

  async findOneById(id: string): Promise<Reward> {
    return this.rewardsRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async findOneByIdAndBrand(id: string, brandId: string): Promise<Reward> {
    return this.rewardsRepo.findOneBy({ id: id, brandId: brandId });
  }

  async findOneByIdAndBrandWithSyncData(id: string, brandId: string) {
    return this.rewardsRepo.findOne({
      where: {
        id: id,
        brandId: brandId,
      },
      select: {
        syncData: true,
        id: true,
        totalDistributedSupply: true,
        brandId: true,
        totalRedeemedSupply: true,
        acceptedCustomerIdentitytypes: true,
        description: true,
        slug: true,
        rewardImage: true,
        otherRewardType: true,
        rewardSymbol: true,
        rewardName: true,
        autoSyncEnabled: true,
        contractAddress: true,
        isBounty: true,
        blockchain: true,
        redistributionPublicKey: true,
        bountyPublicKey: true,
        redistributionKeyIdentifierId: true,
        bountyKeyIdentifierId: true,
        rewardValueInDollars: true,
        rewardValueIsManual: true,
        status: true,
        poolTotalSupply: true,
        rewardDollarPrice: true,
        rOptimal: true,
        treasurySupply: true,
        totalSupply: true,
      },
    });
  }

  async updateReward(reward: Reward) {
    return await this.rewardsRepo.update(reward.id, reward);
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
    const reward = await this.rewardsRepo.findOne({
      where: {
        id: rewardId,
      },
      select: {
        syncData: true,
      },
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

  async activeDraftReward(brandId: string) {
    return this.rewardsRepo.findOne({
      where: {
        brandId,
      },
    });
  }

  async getRewardByIdAndBrandId(rewardId: string, brandId: string) {
    return this.rewardsRepo.findOne({
      where: {
        id: rewardId,
        brandId,
      },
    });
  }

  async getExistingRewardByNameAndSymbol(
    rewardName: string,
    rewardSymbol: string,
  ) {
    // Get rewards where name is equal to name or symbol is equal to symbol using or query return boolean for each check
    const existingRewardWithName = await this.rewardsRepo.findOneBy({
      rewardName: rewardName,
    });

    const existingRewardWithSymbol = await this.rewardsRepo.findOneBy({
      rewardSymbol,
    });

    return {
      rewardName: existingRewardWithName,
      rewardSymbol: existingRewardWithSymbol,
    };
  }

  // @Cron(CronExpression.EVERY_5_MINUTES)
  // async syncElasticSearchIndex() {
  //   const allRewards = await this.rewardsRepo.find({
  //     relations: ['brand'],
  //   });
  //   await this.elasticIndex.batchCreateIndex(allRewards, rewardIndex);
  // }
}
