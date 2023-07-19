import { HttpException, Injectable } from '@nestjs/common';
import { CreateRewardDto } from './dto/createRewardDto.dto';
import { RewardService } from '@src/globalServices/reward/reward.service';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { RewardType } from '@src/utils/enums/RewardType';
import { FilterRewardDto } from './dto/filterRewardDto.dto';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { AddBatchDto } from './dto/addBatchDto.dto';
import { SyncBatch } from '@src/globalServices/reward/entities/syncBatch.entity';
import { UpdateBatchDto } from './dto/updateBatchDto';
import { UserService } from '@src/globalServices/user/user.service';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { RewardRegistry } from '@src/globalServices/reward/entities/registry.entity';
import { UpdateRewardDto } from './dto/updateRewardDto';
import { User } from '@src/globalServices/user/entities/user.entity';
import { getSlug } from '@src/utils/helpers/getSlug';
import { string } from 'joi';

@Injectable()
export class RewardManagementService {
  constructor(
    private readonly rewardService: RewardService,
    private readonly syncService: SyncRewardService,
    private readonly userService: UserService,
  ) {}

  async createReward(body: CreateRewardDto) {
    try {
      const slug = getSlug(body.rewardName);

      const checkReward = await this.rewardService.findOneRewardBySlug(slug);

      if (checkReward) {
        throw new Error('Looks like this reward already exists');
      }

      const reward = new Reward();

      reward.slug = slug;
      reward.brandId = body.brandId;
      reward.description = body.description;
      reward.rewardType = body.rewardType;
      reward.rewardImage = body.rewardImage;
      reward.rewardSymbol = body.rewardSymbol;
      reward.rewardName = body.rewardName;
      reward.autoSyncEnabled = body.autoSyncEnabled;
      reward.acceptedCustomerIdentitytypes = body.acceptedCustomerIdentitytypes;

      if (body.rewardType === RewardType.TOKEN) {
        reward.contractAddress = body.contractAddress;
        reward.isBounty = body.isBounty;
        reward.blockchain = body.blockchain;
      }

      return await this.rewardService.create(reward);
    } catch (error) {
      throw new HttpException(error.message, error.status, {
        cause: new Error(error.message),
      });
    }
  }

  async updateReward(id: string, body: UpdateRewardDto) {
    try {
      const reward = await this.rewardService.findOneByIdAndBrand(
        id,
        body.brandId,
      );

      if (!reward) {
        throw new Error('Reward not found');
      }

      const slug = getSlug(body.rewardName);

      if (slug !== reward.slug) {
        const checkReward = await this.rewardService.findOneRewardBySlug(slug);

        if (checkReward) {
          throw new Error('Looks like this reward already exists');
        }
      }

      reward.slug = slug;
      reward.brandId = body.brandId;
      reward.description = body.description;
      reward.rewardType = body.rewardType;
      reward.rewardImage = body.rewardImage;
      reward.rewardSymbol = body.rewardSymbol;
      reward.rewardName = body.rewardName;
      reward.autoSyncEnabled = body.autoSyncEnabled;
      reward.acceptedCustomerIdentitytypes = body.acceptedCustomerIdentitytypes;

      if (body.rewardType === RewardType.TOKEN) {
        reward.contractAddress = body.contractAddress;
        reward.isBounty = body.isBounty;
        reward.blockchain = body.blockchain;
      }

      return await this.rewardService.save(reward);
    } catch (error) {
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async deleteReward(id: string, brandId: string) {
    return await this.rewardService.delete(id, brandId);
  }

  async getRewardBrand(id: string, brandId: string) {
    return await this.rewardService.findOneByIdAndBrand(id, brandId);
  }

  async getReward(id: string) {
    return await this.rewardService.findOneById(id);
  }

  async getRewards(query: FilterRewardDto) {
    return await this.rewardService.findAll({
      brand_id: query.brandId,
      reward_type: query.rewardType,
      category_id: query.category,
      page: query.page,
      limit: query.limit,
    });
  }

  async updateBatch(body: UpdateBatchDto) {
    try {
      const checkReward = await this.rewardService.findOneById(body.rewardId);

      if (!checkReward) {
        throw new Error('Reward not found');
      }

      const addableSyncData = body.syncData.filter((syncData) => {
        if (
          (syncData.id,
          syncData.identifier,
          syncData.identifierType,
          syncData.amount)
        ) {
          if (
            checkReward.acceptedCustomerIdentitytypes.includes(
              syncData.identifierType,
            )
          ) {
            return {
              id: syncData.id,
              identifier: syncData.identifier,
              identifierType: syncData.identifierType,
              amount: syncData.amount,
            };
          }
        }
      });

      const descripancies = body.syncData.filter((syncData) => {
        if (!syncData.id || !syncData.identifier || !syncData.identifierType) {
          return {
            id: syncData.id,
            identifier: syncData.identifier,
            identifierType: syncData.identifierType,
            reason: `Missing required fields: id, identifier, identifierType or unaccepted by identity type`,
          };
        }
      });

      if (descripancies.length > 0) {
        return {
          descripancies,
          batch: null,
        };
      }

      const checkBatch = await this.syncService.checkActiveBatch(
        body.brandId,
        body.rewardId,
      );

      if (!checkBatch) {
        const newBatch = new SyncBatch();
        newBatch.rewardId = body.rewardId;
        newBatch.syncData = addableSyncData;
        newBatch.description = body.description;

        const savedBatch = await this.syncService.createBatch(newBatch);

        // push new syncData to reward syncData if they doesn't exist
        const newSyncData = addableSyncData.filter((syncData) => {
          const found = checkReward.syncData?.find(
            (item) => item.identifier === syncData.identifier,
          );
          if (!found) {
            return syncData;
          }
        });

        if (checkReward.syncData) {
          checkReward.syncData = [...checkReward.syncData, ...newSyncData];

          await this.rewardService.save(checkReward);
        } else {
          checkReward.syncData = newSyncData;

          await this.rewardService.save(checkReward);
        }

        return {
          descripancies: null,
          batch: savedBatch,
        };
      }

      // compare syncData and add new ones, update and add new ones

      const newSyncData = addableSyncData.filter((syncData) => {
        const found = checkBatch.syncData.find(
          (item) => item.id === syncData.id,
        );
        if (!found) {
          return syncData;
        }

        if (found) {
          found.identifier = syncData.identifier;
          found.identifierType = syncData.identifierType;
          found.amount = syncData.amount;
        }

        return found;
      });

      checkBatch.syncData = newSyncData;
      checkBatch.rewardId = body.rewardId;
      checkBatch.description = body.description;

      const savedBatch = await this.syncService.saveBatch(checkBatch);

      // Push new syncData to reward syncData if they doesn't exist

      if (checkReward.syncData) {
        checkReward.syncData = [...checkReward.syncData, ...newSyncData];

        await this.rewardService.save(checkReward);
      } else {
        checkReward.syncData = newSyncData;

        await this.rewardService.save(checkReward);
      }

      return {
        descripancies: null,
        batch: savedBatch,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getBatch(id: string, brandId: string) {
    return await this.syncService.findOneBatchById(id, brandId);
  }

  async getBatches(query: FilterRewardDto) {
    return await this.syncService.findAllBatch({
      page: query.page,
      limit: query.limit,
      brandId: query.brandId,
    });
  }

  async distributeBatch(brandId: string, rewardId: string) {
    try {
      const batch = await this.syncService.checkActiveBatch(brandId, rewardId);

      if (!batch) {
        throw new Error(
          'Batch alrady distributed or No pending batch not found',
        );
      }

      if (batch.isDistributed) {
        throw new Error('Batch already distributed');
      }

      for (let index = 0; index < batch.syncData.length; index++) {
        const syncData = batch.syncData[index];

        let user: User;

        if (syncData.identifierType === SyncIdentifierType.EMAIL) {
          user = await this.userService.getUserByEmail(syncData.identifier);
        }

        if (syncData.identifierType === SyncIdentifierType.PHONE) {
          user = await this.userService.getUserByPhone(syncData.identifier);
        }

        if (user) {
          //  create registry
          const registry = new RewardRegistry();
          registry.rewardId = batch.rewardId;
          registry.customerIdentiyOnBrandSite = syncData.identifier;
          registry.customerIdentityType = syncData.identifierType;
          registry.balance = 0;
          registry.userId = user.id;

          await this.syncService.addRegistry(registry);

          // create transaction
          await this.syncService.creditReward({
            rewardId: batch.rewardId,
            userId: user.id,
            amount: syncData.amount,
            description: `Reward sync`,
          });
        }
      }

      batch.isDistributed = true;

      const savedBatch = await this.syncService.saveBatch(batch);

      return savedBatch;
    } catch (error) {
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getRegistryByIdentifer(identifier: string, rewardId: string) {
    const register = await this.rewardService.getRegistryByIdentifer(
      identifier,
      rewardId,
    );

    if (!register) {
      throw new HttpException('Customer not found', 404, {
        cause: new Error('Customer not found'),
      });
    }

    return register;
  }
}
