import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from '@src/utils/enums/RewardType';
import { TokenBlockchain } from '@src/utils/enums/reward.enum';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { SendTransactionData } from './distributeBatch.dto';

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

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  addedLiquidity: boolean;
}

export class UpdateRewardCreationDto {
  @ApiProperty()
  @IsUUID()
  rewardId: string;

  @ApiProperty({
    type: 'object',
    example: {
      from: '0x000000',
      nonce: 0,
      data: '0x000000',
      r: '0x000000',
      s: '0x000000',
      v: '0x000000',
      hash: '0x000000',
    },
  })
  @IsObject({
    each: true,
  })
  rsvParams: SendTransactionData;

  brandId: string;
}
