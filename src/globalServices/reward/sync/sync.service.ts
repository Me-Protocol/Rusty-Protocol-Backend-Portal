import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Raw, Repository } from 'typeorm';
import slugify from 'slugify';
import { SyncBatch } from '../entities/syncBatch.entity';
import { RegistryHistory } from '../entities/registryHistory.entity';
import { RewardRegistry } from '../entities/registry.entity';
import { TransactionsType } from '@src/utils/enums/Transactions';
import { RewardService } from '../reward.service';
import { UserService } from '@src/globalServices/user/user.service';
import { AxiosResponse } from 'axios';
import { SendTransactionData } from '@src/modules/storeManagement/reward/dto/distributeBatch.dto';
import { logger } from '@src/globalServices/logger/logger.service';
import { BigNumber, Wallet, ethers } from 'ethers';
import { KeyManagementService } from '@src/globalServices/key-management/key-management.service';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { SettingsService } from '@src/globalServices/settings/settings.service';
import {
  DOLLAR_PRECISION,
  JSON_RPC_URL,
  getTreasuryPermitSignature,
  meTokenToDollarInPrecision,
  treasuryContract,
} from '@developeruche/protocol-core';
import { GetTreasuryPermitDto } from '@src/modules/storeManagement/reward/dto/PushTransactionDto.dto';
import { BrandService } from '@src/globalServices/brand/brand.service';
import {
  distribute_reward_specific_with_url,
  get_user_reward_balance_with_url,
  mutate_n_format_with_url,
  mutate_with_url,
  transfer_reward_with_url,
} from '@developeruche/runtime-sdk';
import { RUNTIME_URL } from '@src/config/env.config';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { User } from '@src/globalServices/user/entities/user.entity';
import { BillerService } from '@src/globalServices/biller/biller.service';
import { BillType } from '@src/utils/enums/BillType';

@Injectable()
export class SyncRewardService {
  constructor(
    @InjectRepository(SyncBatch)
    private readonly syncBatchRepo: Repository<SyncBatch>,

    @InjectRepository(RegistryHistory)
    private readonly registryHistoryRepo: Repository<RegistryHistory>,

    @InjectRepository(RewardRegistry)
    private readonly rewardRegistryRepo: Repository<RewardRegistry>,

    private readonly rewardService: RewardService,
    private readonly userService: UserService,
    private readonly keyManagementService: KeyManagementService,
    private readonly fiatWalletService: FiatWalletService,
    private readonly settingsService: SettingsService,
    private readonly brandService: BrandService,
    private readonly billerService: BillerService,
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
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
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
        customerIdentiyOnBrandSite: registry.customerIdentiyOnBrandSite,
        rewardId: registry.rewardId,
      },
    });

    if (checkRegistry) {
      return checkRegistry;
    }

    const newRegistry = this.rewardRegistryRepo.create(registry);
    return this.rewardRegistryRepo.save(newRegistry);
  }

  async saveRegistry(registry: RewardRegistry) {
    return this.rewardRegistryRepo.save(registry);
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
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  // findOne registry by userId
  async findOneRegistryByUserId(userId: string, rewardId: string) {
    return await this.rewardRegistryRepo.findOne({
      where: {
        userId,
        rewardId,
      },
      relations: ['reward', 'reward.brand'],
    });
  }

  async findOneRegistryByEmailIdentifier(email: string, rewardId: string) {
    return this.rewardRegistryRepo.findOne({
      where: {
        customerIdentiyOnBrandSite: email,
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
    checkBalance,
  }: {
    rewardId: string;
    userId: string;
    amount: number;
    description: string;
    checkBalance?: boolean;
  }) {
    const registry = await this.findOneRegistryByUserId(userId, rewardId);

    if (!registry) {
      throw new Error('Registry not found');
    }

    if (checkBalance && registry.balance < amount) {
      throw new Error('Insufficient balance');
    }

    if (checkBalance && registry.balance >= amount) {
      registry.balance -= amount;
      await this.rewardRegistryRepo.save(registry);
    }

    // add registry history
    // const registryHistory = this.registryHistoryRepo.create({
    //   balance: registry.balance,
    //   description,
    //   transactionType: TransactionsType.DEBIT,
    //   rewardRegistryId: registry.id,
    //   amount: amount,
    // });

    // await this.registryHistoryRepo.save(registryHistory);

    return registry;
  }

  // debit reward
  async disbutributeRewardToExistingUsers({
    registryId,
    amount,
    description,
  }: {
    registryId: string;
    amount: number;
    description: string;
  }) {
    const registry = await this.rewardRegistryRepo.findOne({
      where: {
        id: registryId,
      },
    });

    if (!registry) {
      throw new Error('Registry not found');
    }

    const totalBalance = Number(amount) + Number(registry.totalBalance);
    const formattedSum = totalBalance.toFixed(2);

    registry.balance = 0;
    registry.pendingBalance = 0;
    registry.totalBalance = Number(formattedSum);
    registry.hasBalance = true;

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

  async moveRewardPointToUndistribted({
    customerIdentiyOnBrandSite,
    amount,
    description,
  }: {
    customerIdentiyOnBrandSite: string;
    amount: number;
    description: string;
  }) {
    const registry = await this.rewardRegistryRepo.findOne({
      where: {
        customerIdentiyOnBrandSite,
      },
    });

    if (!registry) {
      throw new Error('Registry not found');
    }

    const totalDistribution =
      Number(amount) + Number(registry.undistributedBalance);
    const formattedSum = totalDistribution.toFixed(2);

    registry.balance = 0;
    registry.pendingBalance = 0;
    registry.undistributedBalance = Number(formattedSum);

    const newReg = await this.rewardRegistryRepo.save(registry);

    // add registry history

    // const registryHistory = this.registryHistoryRepo.create({
    //   balance: registry.balance,
    //   description,
    //   transactionType: TransactionsType.DEBIT,
    //   rewardRegistryId: registry.id,
    //   amount: amount,
    // });

    // await this.registryHistoryRepo.save(registryHistory);

    return newReg;
  }

  async clearUndistributedBalance({
    registryId,
    amount,
    description,
  }: {
    registryId: string;
    amount: number;
    description: string;
  }) {
    const registry = await this.rewardRegistryRepo.findOne({
      where: {
        id: registryId,
      },
    });

    if (!registry) {
      throw new Error('Registry not found');
    }

    const totalBalance = Number(amount) + Number(registry.totalBalance);
    const formattedSum = totalBalance.toFixed(2);

    registry.undistributedBalance = 0.0;
    registry.totalBalance = Number(formattedSum);

    await this.rewardRegistryRepo.save(registry);

    // add registry history

    // const registryHistory = this.registryHistoryRepo.create({
    //   balance: registry.balance,
    //   description,
    //   transactionType: TransactionsType.DEBIT,
    //   rewardRegistryId: registry.id,
    //   amount: amount,
    // });

    // await this.registryHistoryRepo.save(registryHistory);

    return registry;
  }

  // credit reward
  async creditReward({
    rewardId,
    identifier,
    amount,
    description,
  }: {
    rewardId: string;
    identifier: string;
    amount: number;
    description: string;
  }) {
    const registry = await this.rewardRegistryRepo.findOneBy({
      rewardId,
      customerIdentiyOnBrandSite: identifier,
    });

    if (!registry) {
      throw new Error('Registry not found');
    }

    registry.balance += amount;

    await this.rewardRegistryRepo.save(registry);

    // add registry history

    // const registryHistory = this.registryHistoryRepo.create({
    //   balance: registry.balance,
    //   description,
    //   transactionType: TransactionsType.CREDIT,
    //   rewardRegistryId: registry.id,
    //   amount: amount,
    // });

    // await this.registryHistoryRepo.save(registryHistory);

    return registry;
  }

  async fullBalanceUpdate({
    rewardId,
    identifier,
    amount,
    description,
  }: {
    rewardId: string;
    identifier: string;
    amount: number;
    description: string;
  }) {
    const registry = await this.rewardRegistryRepo.findOne({
      where: {
        rewardId,
        customerIdentiyOnBrandSite: identifier,
      },
    });

    if (!registry) {
      throw new Error('Registry not found');
    }

    registry.balance = amount;
    registry.pendingBalance = amount;

    await this.rewardRegistryRepo.save(registry);

    // add registry history

    // const registryHistory = this.registryHistoryRepo.create({
    //   balance: registry.balance,
    //   description,
    //   transactionType: TransactionsType.CREDIT,
    //   rewardRegistryId: registry.id,
    //   amount: amount,
    // });

    // await this.registryHistoryRepo.save(registryHistory);

    return registry;
  }

  async saveRegistryHistory(registryHistory: RegistryHistory) {
    const registry = await this.rewardRegistryRepo.findOne({
      where: {
        id: registryHistory.rewardRegistryId,
      },
      relations: ['user', 'user.customer', 'reward'],
    });

    if (registry.userId) {
      const walletAddress = registry.user.customer.walletAddress;

      const balance = await get_user_reward_balance_with_url(
        {
          address: walletAddress,
          reward_address: registry.reward.contractAddress,
        },
        RUNTIME_URL,
      );

      if (balance.data?.result) {
        const formattedBalance = ethers.utils.formatEther(balance.data.result);
        registry.balance = Number(formattedBalance);

        await this.rewardRegistryRepo.save(registry);

        registryHistory.balance = registry.balance;
      }
    } else {
      registry.balance = 0;
    }

    return await this.registryHistoryRepo.save(registryHistory);
  }

  async checkActiveBatch(brandId: string, rewardId: string) {
    const batch = await this.syncBatchRepo.findOne({
      where: {
        rewardId: rewardId,
        isDistributed: false,
      },
      relations: ['reward', 'reward.brand'],
    });

    return batch;
  }

  async manualSyncReward(userId: string, rewardId: string) {
    const reward = await this.rewardService.findOneById(rewardId);

    if (!reward) {
      throw new Error('Reward not found');
    }

    const user = await this.userService.getUserById(userId);

    const checkAndGetPoints = await this.rewardService.getRegistryByIdentifer(
      user.email,
      rewardId,
    );

    const registry = new RewardRegistry();
    registry.rewardId = rewardId;
    registry.customerIdentiyOnBrandSite = user.email; // TODO Using email for now
    registry.customerIdentityType = checkAndGetPoints.identifierType;
    registry.balance = 0;
    registry.userId = user.id;

    const rewardRegistry = await this.addRegistry(registry);

    if (checkAndGetPoints) {
      // create transaction
      await this.creditReward({
        rewardId: rewardId,
        identifier: user.email,
        amount: checkAndGetPoints.amount,
        description: `Reward sync`,
      });

      return rewardRegistry;
    }

    return rewardRegistry;
  }

  async getRegistryRecordByIdentifer(
    identifier: string,
    rewardId: string,
    identifierType: SyncIdentifierType,
  ) {
    const checkReg = await this.rewardRegistryRepo.findOne({
      where: {
        rewardId,
        customerIdentiyOnBrandSite: identifier,
      },
      relations: ['user', 'user.customer'],
    });

    let user: User;

    if (checkReg) {
      return checkReg;
    }

    if (identifierType === SyncIdentifierType.EMAIL) {
      user = await this.userService.getUserByEmail(identifier);
    } else {
      user = await this.userService.getUserByPhone(identifier);
    }

    const registry = new RewardRegistry();
    registry.rewardId = rewardId;
    registry.customerIdentiyOnBrandSite = identifier; // TODO Using email for now
    registry.customerIdentityType = identifierType;
    registry.balance = 0;
    registry.userId = user?.id;

    const rewardRegistry = await this.addRegistry(registry);

    return await this.rewardRegistryRepo.findOne({
      where: {
        id: rewardRegistry.id,
      },
      relations: ['user', 'user.customer'],
    });
  }

  async getAllRegistryRecordsByIdentifer(identifier: string) {
    return this.rewardRegistryRepo.find({
      where: {
        customerIdentiyOnBrandSite: identifier,
      },
    });
  }

  async pushTransactionToRuntime(params: SendTransactionData) {
    try {
      let spend: AxiosResponse<any>;

      if (params.data.startsWith('0x00000001')) {
        spend = await mutate_n_format_with_url(params, RUNTIME_URL);
      } else {
        spend = await mutate_with_url(params, RUNTIME_URL);
      }

      console.log(spend.data);

      if (spend?.data?.error) {
        throw new Error(spend?.data?.error?.message ?? 'Error pushing rsv');
      }

      return spend?.data ?? spend;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getTreasuryPermitAsync(body: GetTreasuryPermitDto) {
    try {
      const { meDispenser } = await this.settingsService.settingsInit();

      const provider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);
      const wallet = new ethers.Wallet(meDispenser, provider);

      const result = await getTreasuryPermitSignature(
        wallet,
        treasuryContract,
        body.spender,
        ethers.utils.parseEther(body.value),
        ethers.constants.MaxUint256,
      );

      if (result) {
        if (body.createBill) {
          const valueToDollar = await meTokenToDollarInPrecision(
            BigNumber.from(body.value),
          );
          const amountInDollar =
            Number(valueToDollar.toString()) / DOLLAR_PRECISION;

          await this.billerService.createBill({
            amount: amountInDollar,
            brandId: body.brandId,
            type: BillType.INITIAL_REWARD_PURCHASE,
          });
        }

        return {
          v: result.v,
          r: result.r,
          s: result.s,
        };
      }

      throw new Error('Error getting treasury permit');
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async distributeRewardWithKey({
    recipients,
    amounts,
    contractAddress,
    signer,
  }: {
    recipients: string[];
    amounts: BigNumber[];
    contractAddress: string;
    signer: Wallet;
  }) {
    const distributionData = await distribute_reward_specific_with_url(
      contractAddress,
      recipients,
      amounts,
      signer,
      RUNTIME_URL,
    );

    console.log(distributionData.data);

    if (distributionData?.data?.error) {
      throw new Error(
        distributionData.data.error?.message ??
          'Error distributing reward on protocol',
      );
    } else {
      return distributionData;
    }
  }

  async distributeRewardWithPrivateKey({
    rewardId,
    walletAddress,
    amount,
    email,
    keySource = 'redistribution',
  }: {
    rewardId: string;
    walletAddress: string;
    amount: number;
    email?: string;
    keySource?: 'redistribution' | 'campaign';
  }): Promise<{
    data: any;
    error: boolean;
  }> {
    // 1. The function distributeRewardWithPrivateKey takes in the rewardId, walletAddress, amount, and email as parameters. The amount parameter is the amount of rewards you want to send to the wallet address.
    // 2. We then use the rewardId to get the reward and check if the brand has enough balance to distribute rewards.
    const reward = await this.rewardService.findOneById(rewardId);

    // TODO: Check
    // const canPayCost = await this.fiatWalletService.checkCanPayCost(
    //   reward.brandId,
    // );

    // if (!canPayCost) {
    //   return 'Brand cannot pay cost';
    // }

    //3. If the brand has enough balance, we use the redistributionKeyIdentifierId to get the private key identifier and decrypt the private key.

    const decryptedPrivateKey = await this.keyManagementService.getEncryptedKey(
      keySource === 'campaign'
        ? reward.campaignKeyIdentifierId
        : reward.redistributionKeyIdentifierId,
      KeyIdentifierType.REDISTRIBUTION,
    );
    // 4. We then use the private key to sign the transaction and distribute the rewards to the wallet address.
    const signer = new Wallet(decryptedPrivateKey);

    const distributionData = await transfer_reward_with_url(
      reward.contractAddress,
      walletAddress,
      ethers.utils.parseEther(amount.toString()),
      signer,
      RUNTIME_URL,
    );

    const user = await this.userService.getUserByEmail(email);
    // if (user) {
    //   const registry = await this.findOneRegistryByEmailIdentifier(
    //     email,
    //     rewardId,
    //   );

    //   await this.brandService.createBrandCustomer(
    //     reward.brandId,
    //     email,
    //     SyncIdentifierType.EMAIL,
    //   );
    // }

    if (distributionData?.data?.error) {
      console.log(distributionData.data);
      // throw new Error("We couldn't distribute reward");
      return {
        error: true,
        data: distributionData.data,
      };
    } else {
      if (email) {
        const registry = await this.getRegistryRecordByIdentifer(
          email,
          rewardId,
          SyncIdentifierType.EMAIL,
        );

        await this.clearUndistributedBalance({
          registryId: registry.id,
          amount: amount,
          description: `Reward distributed to ${walletAddress}`,
        });
      }

      return {
        data: distributionData,
        error: false,
      };
    }
  }

  // Send reward to task responders
  async distributeTaskRewardWithPrivateKey({
    rewardId,
    walletAddress,
    amount,
  }: {
    rewardId: string;
    walletAddress: string;
    amount: number;
  }) {
    const reward = await this.rewardService.findOneById(rewardId);

    // TODO: Check
    // const canPayCost = await this.fiatWalletService.checkCanPayCost(
    //   reward.brandId,
    // );

    // if (!canPayCost) {
    //   return 'Brand cannot pay cost';
    // }

    const decryptedPrivateKey = await this.keyManagementService.getEncryptedKey(
      reward.redistributionKeyIdentifierId,
      KeyIdentifierType.REDISTRIBUTION,
    );
    const signer = new Wallet(decryptedPrivateKey);

    const distributionData = await transfer_reward_with_url(
      reward.contractAddress,
      walletAddress,
      ethers.utils.parseEther(amount.toString()),
      signer,
      RUNTIME_URL,
    );

    if (distributionData?.data?.error) {
      console.log(distributionData.data);
      throw new Error("We couldn't distribute reward");
    } else {
      return distributionData;
    }
  }

  async getUndistributedReward(userId: string) {
    const rewardRegistry = await this.rewardRegistryRepo.find({
      where: {
        userId,
      },
    });

    //return where rewardRegistry > 0;
    return rewardRegistry.filter(
      (registry) => registry.undistributedBalance > 0,
    );
    // return rewardRegistry.filter(
    //   (registry) => Number(registry.undistributedBalance) > 0,
    // );
  }

  // getUserRegistry(userId: string, rewardId: string) {
  //   return this.rewardRegistryRepo.findOne({
  //     where: {
  //       userId,
  //       rewardId,
  //     },
  //   });
  // }

  async getRegistryHistory({
    userId,
    startDate,
    endDate,
    transactionsType,
    rewardId,
    page,
    limit,
  }: {
    userId: string;
    startDate: Date;
    endDate: Date;
    transactionsType: TransactionsType;
    rewardId: string;
    page: number;
    limit: number;
  }) {
    const registryHistoryQuery =
      this.registryHistoryRepo.createQueryBuilder('registryHistory');

    registryHistoryQuery
      .leftJoinAndSelect('registryHistory.rewardRegistry', 'rewardRegistry')
      .leftJoinAndSelect('rewardRegistry.reward', 'reward')
      .leftJoinAndSelect('reward.brand', 'brand')
      .where('rewardRegistry.userId = :userId', { userId });

    if (rewardId) {
      registryHistoryQuery.andWhere('rewardRegistry.rewardId = :rewardId', {
        rewardId,
      });
    }

    if (transactionsType) {
      registryHistoryQuery.andWhere(
        'registryHistory.transactionType = :transactionsType',
        { transactionsType },
      );
    }

    if (startDate && endDate) {
      registryHistoryQuery.andWhere(
        'registryHistory.createdAt BETWEEN :startDate AND :endDate',
        { startDate, endDate },
      );
    }

    registryHistoryQuery.orderBy('rewardRegistry.createdAt', 'DESC');

    registryHistoryQuery.skip((page - 1) * limit).take(limit);

    const registryHistory = await registryHistoryQuery.getMany();
    const total = await registryHistoryQuery.getCount();

    return {
      total: total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
      registryHistory,
    };
  }
}
