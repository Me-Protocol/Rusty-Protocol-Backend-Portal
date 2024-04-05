import { ApiProperty } from '@nestjs/swagger';
import { SendTransactionData } from '@src/modules/storeManagement/reward/dto/distributeBatch.dto';
import { CampaignStatus } from '@src/utils/enums/CampaignStatus';
import { CampaignType } from '@src/utils/enums/CampaignType';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty()
  @IsNumber()
  totalUsers: number;

  @ApiProperty()
  @IsNumber()
  rewardPerUser: number;

  @ApiProperty({
    type: 'enum',
    enum: CampaignType,
  })
  type: CampaignType;

  @ApiProperty()
  @IsUUID()
  rewardId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  end_date: Date;

  brandId: string;
}

export class UpdateCampaignDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalUsers: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rewardPerUser: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  end_date: Date;

  brandId: string;
  id: string;
}

export class FundCampaignDto {
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
  params: SendTransactionData;

  brandId: string;

  @ApiProperty()
  @IsUUID()
  campaignId: string;
}

export class getCampaignsDto {
  brandId: string;

  @ApiProperty({
    type: 'enum',
    enum: CampaignStatus,
  })
  @IsOptional()
  @IsEnum(CampaignStatus)
  status: CampaignStatus;
}
