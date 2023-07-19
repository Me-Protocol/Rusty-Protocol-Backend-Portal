import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import slugify from 'slugify';
import { SyncBatch } from '../entities/syncBatch.entity';
import { RegistryHistory } from '../entities/registryHistory.entity';
import { RewardRegistry } from '../entities/registry.entity';
import { TransactionsType } from '@src/utils/enums/Transactions';

@Injectable()
export class SyncRewardService {
  constructor(
    @InjectRepository(SyncBatch)
    private readonly syncBatchRepo: Repository<SyncBatch>,

    @InjectRepository(RegistryHistory)
    private readonly registryHistoryRepo: Repository<RegistryHistory>,

    @InjectRepository(RewardRegistry)
    private readonly rewardRegistryRepo: Repository<RewardRegistry>,
  ) {}

  async createBatch(batch: SyncBatch) {
    const newBatch = this.syncBatchRepo.create(batch);
    return this.syncBatchRepo.save(newBatch);
  }

  async saveBatch(batch: SyncBatch) {
    return this.syncBatchRepo.save(batch);
  }

  async findAllBatch({
    brandId,
    page,
    limit,
  }: {
    brandId: string;
    page: number;
    limit: number;
  }) {
    const batches = this.syncBatchRepo.find({
      where: {
        reward: {
          brandId,
        },
      },
      skip: page * limit,
      take: limit,
      relations: ['reward', 'reward.brand'],
    });

    const total = await this.syncBatchRepo.count({
      where: {
        reward: {
          brandId,
        },
      },
    });

    return {
      total,
      batches,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  async findOneBatchById(id: string, brandId: string) {
    return this.syncBatchRepo.findOne({
      where: {
        id,
        reward: {
          brandId,
        },
      },
      relations: ['reward', 'reward.brand'],
    });
  }

  // add registry
  async addRegistry(registry: RewardRegistry) {
    const checkRegistry = await this.rewardRegistryRepo.findOne({
      where: {
        userId: registry.userId,
        rewardId: registry.rewardId,
      },
    });

    if (checkRegistry) {
      return checkRegistry;
    }

    const newRegistry = this.rewardRegistryRepo.create(registry);
    return this.rewardRegistryRepo.save(newRegistry);
  }

  async addRegistryHistory(registryHistory: RegistryHistory) {
    const newRegistryHistory = this.registryHistoryRepo.create(registryHistory);
    return this.registryHistoryRepo.save(newRegistryHistory);
  }

  // find registry history by userid
  async findRegistryHistoryByUserId(
    userId: string,
    page: number,
    limit: number,
  ) {
    const registries = await this.registryHistoryRepo.find({
      where: {
        rewardRegistry: {
          userId,
        },
      },
      skip: page * limit,
      take: limit,
      relations: ['reward', 'reward.brand'],
    });

    const total = await this.registryHistoryRepo.count({
      where: {
        rewardRegistry: {
          userId,
        },
      },
    });

    return {
      total,
      registries,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  // findOne registry by userId
  async findOneRegistryByUserId(userId: string, rewardId: string) {
    return this.rewardRegistryRepo.findOne({
      where: {
        userId,
        rewardId,
      },
      relations: ['reward', 'reward.brand'],
    });
  }

  // debit reward
  async debitReward({
    rewardId,
    userId,
    amount,
    description,
  }: {
    rewardId: string;
    userId: string;
    amount: number;
    description: string;
  }) {
    const registry = await this.findOneRegistryByUserId(userId, rewardId);

    if (!registry) {
      throw new Error('Registry not found');
    }

    if (registry.balance < amount) {
      throw new Error('Insufficient balance');
    }

    registry.balance -= amount;

    await this.rewardRegistryRepo.save(registry);

    // add registry history

    const registryHistory = this.registryHistoryRepo.create({
      balance: registry.balance,
      description,
      transactionType: TransactionsType.DEBIT,
      rewardRegistryId: registry.id,
      amount: amount,
    });

    await this.registryHistoryRepo.save(registryHistory);

    return registry;
  }

  // credit reward
  async creditReward({
    rewardId,
    userId,
    amount,
    description,
  }: {
    rewardId: string;
    userId: string;
    amount: number;
    description: string;
  }) {
    const registry = await this.findOneRegistryByUserId(userId, rewardId);

    if (!registry) {
      throw new Error('Registry not found');
    }

    registry.balance += amount;

    await this.rewardRegistryRepo.save(registry);

    // add registry history

    const registryHistory = this.registryHistoryRepo.create({
      balance: registry.balance,
      description,
      transactionType: TransactionsType.CREDIT,
      rewardRegistryId: registry.id,
      amount: amount,
    });

    await this.registryHistoryRepo.save(registryHistory);

    return registry;
  }

  async checkActiveBatch(brandId: string, rewardId: string) {
    const batch = await this.syncBatchRepo.findOne({
      where: {
        reward: {
          brandId,
          id: rewardId,
        },
        isDistributed: false,
      },
    });

    return batch;
  }
}
