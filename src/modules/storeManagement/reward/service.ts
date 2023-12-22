import { HttpException, Injectable } from '@nestjs/common';
import {
  CreateRewardDto,
  UpdateRewardCreationDto,
} from './dto/createRewardDto.dto';
import { RewardService } from '@src/globalServices/reward/reward.service';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { FilterRewardDto } from './dto/filterRewardDto.dto';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { SyncBatch } from '@src/globalServices/reward/entities/syncBatch.entity';
import { UpdateBatchDto } from './dto/updateBatchDto';
import { UserService } from '@src/globalServices/user/user.service';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { RewardRegistry } from '@src/globalServices/reward/entities/registry.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { getSlug } from '@src/utils/helpers/getSlug';
import { DistributeBatchDto } from './dto/distributeBatch.dto';
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
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { FilterRegistryHistoryDto } from './dto/filterRegistryHistoryDto.dto';
import { RewardStatus } from '@src/utils/enums/ItemStatus';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { AnalyticsRecorderService } from '@src/globalServices/analytics/analytic_recorder.service';
import { RewardCirculation } from '@src/globalServices/analytics/entities/reward_circulation';
import { UpdateRewardDto } from './dto/updateRewardDto';
import { NotificationService } from '@src/globalServices/notification/notification.service';
import { Notification } from '@src/globalServices/notification/entities/notification.entity';
import { NotificationType } from '@src/utils/enums/notification.enum';

@Injectable()
export class RewardManagementService {
  constructor(
    private readonly rewardService: RewardService,
    private readonly syncService: SyncRewardService,
    private readonly userService: UserService,
    private readonly keyManagementService: KeyManagementService,
    private readonly fiatWalletService: FiatWalletService,
    private readonly brandService: BrandService,
    private readonly analyticsRecorder: AnalyticsRecorderService,
    private readonly notificationService: NotificationService,
  ) {}

  async createReward(body: CreateRewardDto) {
    try {
      const slug = getSlug(body.rewardName);

      let isDraft = true;

      let reward: Reward;

      reward = await this.rewardService.getDraftReward(body.brandId);

      if (!reward) {
        reward = new Reward();
        isDraft = false;
      }

      const checkReward = await this.rewardService.findOneRewardByName(
        body.rewardName,
      );

      if (checkReward && !isDraft) {
        throw new Error('Looks like this reward already exists');
      }

      if (body.rewardName) reward.slug = slug;
      reward.brandId = body.brandId;
      if (body.description) reward.description = body.description;
      if (body.rewardImage) reward.rewardImage = body.rewardImage;
      if (body.rewardSymbol) reward.rewardSymbol = body.rewardSymbol;
      if (body.rewardName) reward.rewardName = body.rewardName;
      if (body.autoSyncEnabled) reward.autoSyncEnabled = body.autoSyncEnabled;
      if (body.acceptedCustomerIdentitytypes)
        reward.acceptedCustomerIdentitytypes =
          body.acceptedCustomerIdentitytypes;
      if (body.isBounty) reward.isBounty = body.isBounty;
      if (body.blockchain) reward.blockchain = body.blockchain;
      if (body.poolTotalSupply) reward.poolTotalSupply = body.poolTotalSupply;
      if (body.totalSupply) reward.totalSupply = +body.totalSupply;
      if (body.rewardDollarPrice)
        reward.rewardDollarPrice = body.rewardDollarPrice;
      if (body.rOptimal) reward.rOptimal = body.rOptimal;
      if (body.rewardValueInDollars)
        reward.rewardValueInDollars = body.rewardValueInDollars;
      if (body.treasurySupply) reward.treasurySupply = body.treasurySupply;

      if (isDraft) {
        return await this.rewardService.save(reward);
      } else {
        return await this.rewardService.create(reward);
      }
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.status, {
        cause: new Error(error.message),
      });
    }
  }

  async completeReward(body: UpdateRewardCreationDto) {
    const checkContractAddress =
      await this.rewardService.getRewardByContractAddress(body.contractAddress);

    if (checkContractAddress) {
      throw new HttpException('Contract address already exists', 400, {
        cause: new Error('Contract address already exists'),
      });
    }

    const reward = await this.rewardService.getRewardByIdAndBrandId(
      body.rewardId,
      body.brandId,
    );

    if (!reward) {
      throw new HttpException('Reward not found', 404, {
        cause: new Error('Reward not found'),
      });
    }

    if (reward.status === RewardStatus.PUBLISHED) {
      throw new HttpException('Reward already published', 400, {
        cause: new Error('Reward already published'),
      });
    }

    // TODO generate private key and public key

    const createBountyKey = generateWalletRandom();
    const createRedistributionKey = generateWalletRandom();

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
      await this.rewardService.createKeyIdentifer(redistributionKeyIdentifier);

    const bountyKeyIdentifier = new KeyIdentifier();
    bountyKeyIdentifier.identifier = bountyEncryptedKey;
    bountyKeyIdentifier.identifierType = KeyIdentifierType.BOUNTY;

    const newBountyKeyIdentifier = await this.rewardService.createKeyIdentifer(
      bountyKeyIdentifier,
    );

    reward.contractAddress = body.contractAddress;
    reward.status = RewardStatus.PUBLISHED;
    reward.redistributionPublicKey = pubKey;
    reward.bountyPublicKey = bountyPubKey;
    reward.redistributionKeyIdentifierId = newRedistributionKeyIdentifier.id;
    reward.bountyKeyIdentifierId = newBountyKeyIdentifier.id;

    return await this.rewardService.save(reward);
  }

  async updateReward(rewardId: string, body: UpdateRewardDto) {
    try {
      const reward = await this.rewardService.findOneByIdAndBrand(
        rewardId,
        body.brandId,
      );
      if (!reward) {
        throw new Error('Reward not found');
      }

      if (body.description) reward.description = body.description;
      if (body.rewardImage) reward.rewardImage = body.rewardImage;
      if (body.autoSyncEnabled) reward.autoSyncEnabled = body.autoSyncEnabled;
      if (body.acceptedCustomerIdentitytypes)
        reward.acceptedCustomerIdentitytypes =
          body.acceptedCustomerIdentitytypes;
      if (body.isBounty) reward.isBounty = body.isBounty;
      if (body.acceptedCustomerIdentitytypes)
        reward.acceptedCustomerIdentitytypes =
          body.acceptedCustomerIdentitytypes;
      if (body.poolTotalSupply) reward.poolTotalSupply = body.poolTotalSupply;
      if (body.totalSupply) reward.totalSupply = +body.totalSupply;
      if (reward.rewardValueInDollars)
        reward.rewardValueInDollars = body.rewardValueInDollars;

      const updatedReward = await this.rewardService.updateReward(reward);

      console.log(updatedReward);

      return await this.rewardService.findOneByIdAndBrand(
        rewardId,
        body.brandId,
      );
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, error.status, {
        cause: new Error(error.message),
      });
    }
  }

  async getDraftReward(brandId: string) {
    return await this.rewardService.getDraftReward(brandId);
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

  // create customer
  async createCustomers(userId: string, brandId: string) {
    const checkCustomer = await this.brandService.getBrandCustomer(
      brandId,
      userId,
    );

    if (!checkCustomer) {
      await this.brandService.createBrandCustomer(userId, brandId);
    }

    return true;
  }

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
      const checkReward =
        await this.rewardService.findOneByIdAndBrandWithSyncData(
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

        const totalDistributed = addableSyncData.reduce(
          (acc, cur) => acc + +cur.amount,
          0,
        );

        checkReward.totalDistributedSupply =
          Number(checkReward.totalDistributedSupply) + Number(totalDistributed);
        await this.rewardService.save(checkReward);

        // Update circulating supply
        const circulatingSupply = new RewardCirculation();
        circulatingSupply.brandId = checkReward.brandId;
        circulatingSupply.rewardId = checkReward.id;
        circulatingSupply.circulatingSupply =
          Number(checkReward.totalDistributedSupply) -
          Number(checkReward.totalRedeemedSupply);
        circulatingSupply.totalRedeemedAtCirculation =
          checkReward.totalRedeemedSupply;
        circulatingSupply.totalDistributedSupplyAtCirculation =
          checkReward.totalDistributedSupply;

        await this.analyticsRecorder.createRewardCirculation(circulatingSupply);

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

      const totalDistributed = addableSyncData.reduce(
        (acc, cur) => acc + +cur.amount,
        0,
      );

      checkReward.totalDistributedSupply =
        Number(checkReward.totalDistributedSupply) + Number(totalDistributed);
      await this.rewardService.save(checkReward);

      // Update circulating supply
      const circulatingSupply = new RewardCirculation();
      circulatingSupply.brandId = checkReward.brandId;
      circulatingSupply.rewardId = checkReward.id;
      circulatingSupply.circulatingSupply =
        Number(checkReward.totalDistributedSupply) -
        Number(checkReward.totalRedeemedSupply);
      circulatingSupply.totalRedeemedAtCirculation =
        checkReward.totalRedeemedSupply;
      circulatingSupply.totalDistributedSupplyAtCirculation =
        checkReward.totalDistributedSupply;

      await this.analyticsRecorder.createRewardCirculation(circulatingSupply);

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
        const syncData = JSON.parse(syncDataJSON as any) as typeof syncDataJSON;

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

          await this.createCustomers(user.id, batch.reward.brandId);
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

      const canPayCost = await this.fiatWalletService.checkCanPayCost(brandId);

      if (!canPayCost) {
        throw new Error('Brand cannot pay cost');
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

  async getRegistryHistory(query: FilterRegistryHistoryDto) {
    return await this.syncService.getRegistryHistory({
      startDate: query.startDate,
      endDate: query.endDate,
      userId: query.userId,
      transactionsType: query.transactionsType,
    });
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
        const syncData = JSON.parse(syncDataJSON as any) as typeof syncDataJSON;

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

      const canPayCost = await this.fiatWalletService.checkCanPayCost(brandId);

      if (!canPayCost) {
        throw new Error('Brand cannot pay cost');
      }

      const syncData = batch.syncData;

      const { privKey } = generateWalletWithApiKey(
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

      const canPayCost = await this.fiatWalletService.checkCanPayCost(brandId);

      if (!canPayCost) {
        throw new Error('Brand cannot pay cost');
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

  async checkUniqueRewardNameAndSymbol(name: string, symbol: string) {
    if (!name || !symbol) {
      throw new HttpException('Name and symbol are required', 400, {
        cause: new Error('Name and symbol are required'),
      });
    }

    const { rewardName, rewardSymbol } =
      await this.rewardService.getExistingRewardByNameAndSymbol(name, symbol);

    return {
      rewardName: !rewardName,
      rewardSymbol: !rewardSymbol,
    };
  }

  async issueAndDistributeReward(body: UpdateBatchDto, apiKey: ApiKey) {
    await this.updateBatch(body);
    return await this.distributeWithApiKey(apiKey, body.rewardId);
  }

  async completeDistribution({
    users,
    rewardId,
  }: {
    users: {
      wallet: string;
      amount: number;
    }[];
    rewardId: string;
  }) {
    const reward = await this.rewardService.findOneById(rewardId);

    for (const user of users) {
      const userDetail = await this.userService.getUserByWalletAddress(
        user.wallet,
      );

      if (userDetail) {
        this.rewardDistrbutedEmail({
          user: userDetail,
          reward,
          amount: user.amount,
        });
      }
    }

    return 'ok';
  }

  async rewardDistrbutedEmail({
    user,
    reward,
    amount,
  }: {
    user: User;
    reward: Reward;
    amount: number;
  }) {
    const notification = new Notification();
    notification.userId = user.id;
    notification.message = `Hello ${user?.customer?.name} you just recieved ${amount} ${reward.rewardSymbol} from ${reward.brand.name}`;
    notification.type = NotificationType.POINT;
    notification.title = 'Order Failed';
    notification.icon = reward.rewardImage;
    notification.emailMessage = /* html */ `
              <div>
                <p>Hello ${user?.customer?.name},</p>
                <p>You just recieved ${amount} ${reward.rewardSymbol} from ${reward.brand.name}<p>
              `;

    await this.notificationService.createNotification(notification);
  }
}
