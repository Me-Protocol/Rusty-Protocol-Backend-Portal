import {
  distribute_bounty_by_reward_address_magic,
  mutate,
} from '@developeruche/runtime-sdk';
import { Injectable } from '@nestjs/common';
import { KeyManagementService } from '@src/globalServices/key-management/key-management.service';
import { RewardService } from '@src/globalServices/reward/reward.service';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';
import { BigNumber, Wallet } from 'ethers';

@Injectable()
export class RewarderService {
  constructor(
    private readonly rewardService: RewardService,
    private readonly keyManagementService: KeyManagementService,
  ) {}

  async sendReward({
    addresses,
    rewardId,
    amounts,
  }: {
    addresses: string[];
    rewardId: string;
    amounts: BigNumber[];
  }) {
    console.log(addresses, rewardId, amounts);

    try {
      const reward = await this.rewardService.findOneById(rewardId);

      const keyIdentifier = await this.rewardService.getKeyIdentifier(
        reward.redistributionKeyIdentifierId,
        KeyIdentifierType.REDISTRIBUTION,
      );
      const decryptedPrivateKey = await this.keyManagementService.decryptKey(
        keyIdentifier.identifier,
      );
      const signer = new Wallet(decryptedPrivateKey);

      const distributeData = await distribute_bounty_by_reward_address_magic(
        reward.contractAddress,
        addresses,
        amounts,
        signer,
      );

      const distribute = await mutate(distributeData);

      if (distribute.data?.error) {
        throw new Error('Rewarder service is down.');
      } else {
        return distribute.data;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
