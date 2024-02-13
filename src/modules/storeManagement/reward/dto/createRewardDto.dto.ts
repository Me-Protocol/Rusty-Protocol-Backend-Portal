import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from '@src/utils/enums/RewardType';
import { TokenBlockchain } from '@src/utils/enums/reward.enum';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateRewardDto {
  brandId: string;

  @ApiProperty()
  @IsString()
  description: string;

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

  apiKey: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  poolTotalSupply: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  totalSupply: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rewardDollarPrice: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rOptimal: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  rewardValueInDollars: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  treasurySupply: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contractAddress: string;
}

export class UpdateRewardCreationDto {
  @ApiProperty()
  @IsUUID()
  rewardId: string;

  brandId: string;
}
