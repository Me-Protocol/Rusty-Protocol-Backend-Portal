import { TokenBlockchain } from '@src/utils/enums/reward.enum';
import { RewardType } from '../interfaces/reward.inteface';
import { IsString } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  id?: string;

  @IsString()
  rewardId: string;

  @IsString()
  brandId: string;

  @IsString()
  brandName: string;

  @IsString()
  slug: string;

  rewardType: RewardType;

  @IsString()
  rewardImage: string;

  @IsString()
  otherRewardType?: string;

  @IsString()
  rewardSymbol: string;

  @IsString()
  autoSyncEnabled: boolean;

  @IsString()
  rewardName: string;

  @IsString()
  description: string;

  @IsString()
  syncApiAddress?: string;

  @IsString()
  syncApiAccessToken?: string;

  @IsString()
  syncApiRefreshToken?: string;

  @IsString()
  oidcDiscoveryAddress?: string;

  @IsString()
  contractAddress?: string;

  blockchain?: TokenBlockchain;

  @IsString()
  isBounty?: boolean;
}
