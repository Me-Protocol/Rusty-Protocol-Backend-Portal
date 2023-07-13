import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from '@src/utils/enums/RewardType';
import { TokenBlockchain } from '@src/utils/enums/reward.enum';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class CreateRewardDto {
  brandId: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(RewardType, {
    message: 'Reward type is invalid',
  })
  rewardType: RewardType;

  @ApiProperty()
  @IsString()
  rewardImage: string;

  @ApiProperty()
  @IsString()
  otherRewardType: string;

  @ApiProperty()
  @IsString()
  rewardSymbol: string;

  @ApiProperty()
  @IsString()
  rewardName: string;

  @ApiProperty()
  @IsBoolean()
  autoSyncEnabled: boolean;

  @ApiProperty()
  @IsString()
  contractAddress: string;

  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty()
  @IsBoolean()
  isBounty: boolean;

  @ApiProperty()
  @IsEnum(TokenBlockchain, {
    message: 'Token blockchain is invalid',
  })
  blockchain: TokenBlockchain;

  @ApiProperty()
  @IsString()
  syncApiAddress: string;

  @ApiProperty()
  @IsString()
  syncApiAccessToken: string;

  @ApiProperty()
  @IsString()
  syncApiRefreshToken: string;

  @ApiProperty()
  @IsString()
  oidcDiscoveryAddress: string;

  @ApiProperty()
  @IsString()
  acceptedCustomerIdentitytypes: string[];
}
