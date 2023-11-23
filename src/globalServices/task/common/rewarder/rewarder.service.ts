import { distribute_bounty_by_reward_address_magic } from '@developeruche/runtime-sdk';
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

      const distribute = await distribute_bounty_by_reward_address_magic(
        reward.contractAddress,
        addresses,
        amounts,
        signer,
      );

      console.log(distribute);

      return distribute;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
