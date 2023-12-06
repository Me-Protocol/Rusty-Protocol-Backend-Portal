import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from '@src/utils/enums/RewardType';
import { TokenBlockchain } from '@src/utils/enums/reward.enum';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateRewardDto {
  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rewardImage: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  autoSyncEnabled: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isBounty: boolean;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  acceptedCustomerIdentitytypes: string[];

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  poolTotalSupply: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  rewardValueInDollars: number;
}
