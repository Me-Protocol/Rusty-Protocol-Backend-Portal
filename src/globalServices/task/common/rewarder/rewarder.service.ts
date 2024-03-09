import {
  distribute_bounty_by_reward_address_magic,
  mutate_with_url,
} from '@developeruche/runtime-sdk';
import { Injectable } from '@nestjs/common';
import { RUNTIME_URL } from '@src/config/env.config';
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
    try {
      const reward = await this.rewardService.findOneById(rewardId);

      const keyIdentifier = await this.keyManagementService.getKeyIdentifier(
        reward.redistributionKeyIdentifierId,
        KeyIdentifierType.REDISTRIBUTION,
      );
      const decryptedPrivateKey = await this.keyManagementService.decryptKey(
        keyIdentifier.identifier,
      );

      const signer = new Wallet(decryptedPrivateKey);

      console.log(
        addresses,
        rewardId,
        amounts,
        decryptedPrivateKey,
        signer.address,
      );

      const distributeData = await distribute_bounty_by_reward_address_magic(
        reward.contractAddress,
        addresses,
        amounts,
        signer,
        RUNTIME_URL,
      );

      const distribute = await mutate_with_url(distributeData, RUNTIME_URL);

      if (distribute.data?.error) {
        console.log(distribute.data?.error);
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
