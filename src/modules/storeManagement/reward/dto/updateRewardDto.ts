import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from '@src/utils/enums/RewardType';
import { TokenBlockchain } from '@src/utils/enums/reward.enum';
import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';

export class UpdateRewardDto {
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
  @IsArray()
  acceptedCustomerIdentitytypes: string[];
}
