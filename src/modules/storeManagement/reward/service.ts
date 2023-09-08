import { HttpException, Injectable } from '@nestjs/common';
import { CreateRewardDto } from './dto/createRewardDto.dto';
import { RewardService } from '@src/globalServices/reward/reward.service';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { FilterRewardDto } from './dto/filterRewardDto.dto';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { SyncBatch } from '@src/globalServices/reward/entities/syncBatch.entity';
import { UpdateBatchDto } from './dto/updateBatchDto';
import { UserService } from '@src/globalServices/user/user.service';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { RewardRegistry } from '@src/globalServices/reward/entities/registry.entity';
import { UpdateRewardDto } from './dto/updateRewardDto';
import { User } from '@src/globalServices/user/entities/user.entity';
import { getSlug } from '@src/utils/helpers/getSlug';
import {
  DistributeBatchDto,
  SendTransactionData,
} from './dto/distributeBatch.dto';
import {
  distribute_reward_specific,
  distribute_reward_specific_magic,
  mutate,
  mutate_n_format,
} from '@developeruche/runtime-sdk';
import { SpendRewardDto } from './dto/spendRewardDto.dto';
import { AxiosResponse } from 'axios';
import { logger } from '@src/globalServices/logger/logger.service';
import { KeyManagementService } from '@src/globalServices/key-management/key-management.service';
import {
  generateWalletRandom,
  generateWalletWithApiKey,
} from '@developeruche/protocol-core';
import { KeyIdentifier } from '@src/globalServices/reward/entities/keyIdentifier.entity';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';
import { ApiKey } from '@src/globalServices/api_key/entities/api_key.entity';
import { ethers } from 'ethers';

@Injectable()
export class RewardManagementService {
  constructor(
    private readonly rewardService: RewardService,
    private readonly syncService: SyncRewardService,
    private readonly userService: UserService,
    private readonly keyManagementService: KeyManagementService,
  ) {}

  async createReward(body: CreateRewardDto) {
    try {
      const slug = getSlug(body.rewardName);

      const checkReward = await this.rewardService.findOneRewardBySlug(slug);

      if (checkReward) {
        throw new Error('Looks like this reward already exists');
      }

      // TODO generate private key and public key
      let createRedistributionKey: {
        pubKey: string;
        privKey: string;
      };
      let createBountyKey: {
        pubKey: string;
        privKey: string;
      };

      if (body.apiKey) {
        createBountyKey = generateWalletWithApiKey(
          body.apiKey,
          process.env.API_KEY_SALT,
        );
        createRedistributionKey = generateWalletWithApiKey(
          body.apiKey,
          process.env.API_KEY_SALT,
        );
      } else {
        createBountyKey = generateWalletRandom();
        createRedistributionKey = generateWalletRandom();
      }

      const { pubKey, privKey } = createRedistributionKey;
      const { pubKey: bountyPubKey, privKey: bountyPrivKey } = createBountyKey;

      // Encrypt private key
      const redistributionEncryptedKey =
        await this.keyManagementService.encryptKey(privKey);
      const bountyEncryptedKey = await this.keyManagementService.encryptKey(
        bountyPrivKey,
      );

      // Create key identifier
      const redistributionKeyIdentifier = new KeyIdentifier();
      redistributionKeyIdentifier.identifier = redistributionEncryptedKey;
      redistributionKeyIdentifier.identifierType =
        KeyIdentifierType.REDISTRIBUTION;

      const newRedistributionKeyIdentifier =
        await this.rewardService.createKeyIdentifer(
          redistributionKeyIdentifier,
        );

      const bountyKeyIdentifier = new KeyIdentifier();
      bountyKeyIdentifier.identifier = bountyEncryptedKey;
      bountyKeyIdentifier.identifierType = KeyIdentifierType.BOUNTY;

      const newBountyKeyIdentifier =
        await this.rewardService.createKeyIdentifer(bountyKeyIdentifier);

      const reward = new Reward();

      reward.slug = slug;
      reward.brandId = body.brandId;
      reward.description = body.description;
      reward.rewardImage = body.rewardImage;
      reward.rewardSymbol = body.rewardSymbol;
      reward.rewardName = body.rewardName;
      reward.autoSyncEnabled = body.autoSyncEnabled;
      reward.acceptedCustomerIdentitytypes = body.acceptedCustomerIdentitytypes;

      reward.contractAddress = body.contractAddress;
      reward.isBounty = body.isBounty;
      reward.blockchain = body.blockchain;
      reward.redistributionPublicKey = pubKey;
      reward.bountyPublicKey = bountyPubKey;
      reward.redistributionKeyIdentifierId = newRedistributionKeyIdentifier.id;
      reward.bountyKeyIdentifierId = newBountyKeyIdentifier.id;

      const newReward = await this.rewardService.create(reward);

      return newReward;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.status, {
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

  async getRewardByContractAddress(contractAddress: string) {
    return await this.rewardService.getRewardByContractAddress(contractAddress);
  }

  async getRewards(query: FilterRewardDto) {
    return await this.rewardService.findAll({
      brand_id: query.brandId,
      category_id: query.category,
      page: query.page,
      limit: query.limit,
    });
  }

  getAddableSyncData(syncData: any[], reward: Reward) {
    const addableSyncData = syncData.filter((syncData) => {
      if (
        (syncData.id,
        syncData.identifier,
        syncData.identifierType,
        syncData.amount)
      ) {
        if (
          reward.acceptedCustomerIdentitytypes.includes(syncData.identifierType)
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

    const descripancies = syncData.filter((syncData) => {
      if (!syncData.id || !syncData.identifier || !syncData.identifierType) {
        return {
          id: syncData.id,
          identifier: syncData.identifier,
          identifierType: syncData.identifierType,
          reason: `Missing required fields: id, identifier, identifierType or unaccepted identity type`,
        };
      }
    });

    return {
      addableSyncData,
      descripancies,
      hasDescripancies: descripancies.length > 0 ? true : false,
    };
  }

  async createRewardRegistry({
    amount,
    identifier,
    identifierType,
    rewardId,
  }: {
    amount: number;
    identifier: string;
    identifierType: SyncIdentifierType;
    rewardId: string;
  }) {
    let user: User;

    if (identifierType === SyncIdentifierType.EMAIL) {
      user = await this.userService.getUserByEmail(identifier);
    }

    if (identifierType === SyncIdentifierType.PHONE) {
      user = await this.userService.getUserByPhone(identifier);
    }

    const registry = new RewardRegistry();
    registry.rewardId = rewardId;
    registry.customerIdentiyOnBrandSite = identifier;
    registry.customerIdentityType = identifierType;
    registry.balance = 0;
    registry.userId = user?.id;

    const newReg = await this.syncService.addRegistry(registry);

    // create transaction
    await this.syncService.fullBalanceUpdate({
      rewardId: rewardId,
      identifier,
      amount: amount,
      description: `Reward sync`,
    });
  }

  //

  async addPointsToRewardRegistry(addableSyncData: any[], rewardId: string) {
    for (const syncData of addableSyncData) {
      const identifier = syncData.identifier;
      const checkRegistry = await this.syncService.getRegistryRecordByIdentifer(
        identifier,
        rewardId,
      );

      if (checkRegistry) {
        // create transaction
        await this.syncService.fullBalanceUpdate({
          rewardId: rewardId,
          identifier: identifier,
          amount: syncData.amount,
          description: `Reward sync`,
        });
      } else {
        await this.createRewardRegistry({
          amount: syncData.amount,
          identifier: identifier,
          identifierType: syncData.identifierType,
          rewardId: rewardId,
        });
      }
    }

    return true;
  }

  async updateBatch(body: UpdateBatchDto) {
    try {
      const checkReward = await this.rewardService.findOneByIdAndBrand(
        body.rewardId,
        body.brandId,
      );

      if (!checkReward) {
        throw new Error('Reward not found');
      }

      const { hasDescripancies, descripancies, addableSyncData } =
        this.getAddableSyncData(body.syncData, checkReward);

      if (hasDescripancies) {
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
        const newSyncDataForReward = addableSyncData.filter((syncData) => {
          const found = checkReward.syncData?.find(
            (item) => item.identifier === syncData.identifier,
          );
          if (!found) {
            return syncData;
          }
        });

        // Get all batches

        if (checkReward.syncData) {
          checkReward.syncData = [
            ...checkReward.syncData,
            ...newSyncDataForReward,
          ];

          await this.rewardService.save(checkReward);
        } else {
          checkReward.syncData = newSyncDataForReward;

          await this.rewardService.save(checkReward);
        }

        await this.addPointsToRewardRegistry(addableSyncData, body.rewardId);

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

      // Update the registry if the identifier is found

      await this.addPointsToRewardRegistry(addableSyncData, body.rewardId);

      return {
        descripancies: null,
        batch: savedBatch,
      };
    } catch (error) {
      logger.error(error);
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

  async updateUsersRewardRegistryAfterDistribution({
    batch,
    rewardId,
  }: {
    batch: SyncBatch;
    rewardId: string;
  }) {
    // Pick the rewards whose users exists and update balacne to 0
    return await Promise.all(
      batch.syncData.map(async (syncDataJSON) => {
        // @ts-ignore
        const syncData = JSON.parse(syncDataJSON) as typeof syncDataJSON;

        let user: User;

        if (syncData.identifierType === SyncIdentifierType.EMAIL) {
          user = await this.userService.getUserByEmail(syncData.identifier);
        }

        if (syncData.identifierType === SyncIdentifierType.PHONE) {
          user = await this.userService.getUserByPhone(syncData.identifier);
        }

        if (user) {
          // Get users rewardRegistry
          const registry = await this.syncService.getRegistryRecordByIdentifer(
            syncData.identifier,
            rewardId,
          );

          if (registry) {
            await this.syncService.disbutributeRewardToExistingUsers({
              registryId: registry.id,
              amount: syncData.amount,
              description: `Reward distributed to ${user.customer.walletAddress}`,
            });
          }
        } else {
          await this.syncService.moveRewardPointToUndistribted({
            customerIdentiyOnBrandSite: syncData.identifier,
            amount: syncData.amount,
            description: 'Moved reward to undistributed balance',
          });
        }
      }),
    );
  }

  async distributeBatch(brandId: string, body: DistributeBatchDto) {
    try {
      const batch = await this.syncService.checkActiveBatch(
        brandId,
        body.rewardId,
      );

      if (!batch) {
        throw new Error('No batch to distribute');
      }

      if (batch.isDistributed) {
        throw new Error('Batch already distributed');
      }

      const reward = this.rewardService.findOneByIdAndBrand(
        body.rewardId,
        brandId,
      );

      if (!reward) {
        throw new Error('Reward not found');
      }

      await this.syncService.pushTransactionToRuntime(body.params);

      await this.updateUsersRewardRegistryAfterDistribution({
        batch,
        rewardId: body.rewardId,
      });

      batch.isDistributed = true;

      await this.syncService.saveBatch(batch);

      return {
        message: 'distributed',
      };
    } catch (error) {
      logger.error(error);
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

  async getDistributionUsersAndAmount({
    rewardId,
    syncData,
  }: {
    rewardId: string;
    syncData: {
      id: string;
      identifier: string;
      identifierType: SyncIdentifierType;
      amount: number;
    }[];
  }) {
    const users = [];
    const amounts = [];
    let aggregateSumOfNonExistingUsers = 0;

    await Promise.all(
      syncData.map(async (syncDataJSON) => {
        // @ts-ignore
        const syncData = JSON.parse(syncDataJSON);

        let user: User;

        if (syncData.identifierType === SyncIdentifierType.EMAIL) {
          user = await this.userService.getUserByEmail(syncData.identifier);
        }

        if (syncData.identifierType === SyncIdentifierType.PHONE) {
          user = await this.userService.getUserByPhone(syncData.identifier);
        }

        if (!user) {
          aggregateSumOfNonExistingUsers += syncData.amount;
        } else {
          if (!user.customer.walletAddress) {
            aggregateSumOfNonExistingUsers += syncData.amount;
          } else {
            const registry =
              await this.syncService.getRegistryRecordByIdentifer(
                syncData.identifier,
                rewardId,
              );

            if (registry) {
              users.push(user.customer.walletAddress);
              amounts.push(ethers.utils.parseEther(syncData.amount.toString()));
            }
          }
        }
      }),
    );

    return {
      users,
      amounts,
      aggregateSumOfNonExistingUsers,
    };
  }

  async distributeWithApiKey(apiKey: ApiKey, rewardId: string) {
    try {
      const { privateKey, brandId } = apiKey;

      const batch = await this.syncService.checkActiveBatch(brandId, rewardId);
      const reward = await this.rewardService.findOneByIdAndBrand(
        rewardId,
        brandId,
      );

      if (!batch) {
        throw new Error('No batch to distribute');
      }

      if (batch.isDistributed) {
        throw new Error('Batch already distributed');
      }

      if (!reward) {
        throw new Error('Reward not found');
      }

      const syncData = batch.syncData;

      const { privKey, pubKey } = generateWalletWithApiKey(
        privateKey,
        process.env.API_KEY_SALT,
      );

      const wallet = new ethers.Wallet(privKey);

      const { users, amounts, aggregateSumOfNonExistingUsers } =
        await this.getDistributionUsersAndAmount({
          rewardId,
          syncData,
        });

      const recipients = [...users, reward.redistributionPublicKey];
      const reward_amounts = [
        ...amounts,
        ethers.utils.parseEther(aggregateSumOfNonExistingUsers.toString()),
      ];

      await this.syncService.distributeRewardWithKey({
        contractAddress: reward.contractAddress,
        recipients,
        amounts: reward_amounts,
        signer: wallet,
      });

      await this.updateUsersRewardRegistryAfterDistribution({
        batch,
        rewardId: rewardId,
      });

      batch.isDistributed = true;

      await this.syncService.saveBatch(batch);

      return {
        message: 'distributed',
      };
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getBatchUserWalletsAndAmount(brandId: string, rewardId: string) {
    try {
      const batch = await this.syncService.checkActiveBatch(brandId, rewardId);
      const reward = await this.rewardService.findOneByIdAndBrand(
        rewardId,
        brandId,
      );

      if (!batch) {
        throw new Error('No batch to distribute');
      }

      if (batch.isDistributed) {
        throw new Error('Batch already distributed');
      }

      if (!reward) {
        throw new Error('Reward not found');
      }

      const syncData = batch.syncData;

      const { users, amounts, aggregateSumOfNonExistingUsers } =
        await this.getDistributionUsersAndAmount({
          rewardId,
          syncData,
        });

      const recipients = [...users, reward.redistributionPublicKey];
      const reward_amounts = [
        ...amounts,
        ethers.utils.parseEther(aggregateSumOfNonExistingUsers.toString()),
      ];

      return {
        recipients,
        reward_amounts,
      };
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }
}
