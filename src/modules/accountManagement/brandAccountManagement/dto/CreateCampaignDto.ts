import { ApiProperty } from '@nestjs/swagger';
import { CampaignType } from '@src/utils/enums/CampaignType';
import {
  IsDateString,
  IsNumber,
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
