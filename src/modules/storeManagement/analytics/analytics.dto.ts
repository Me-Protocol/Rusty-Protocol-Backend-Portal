import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { RewardCirculationFilter } from '@src/utils/enums/RewardCirculationFilter';
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class AnalyticsDto {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  end: Date;

  brandId: string;
}

export class TotalOfferDto {
  @ApiProperty()
  @IsEnum(ProductStatus, {
    message: 'Please use a valid status',
  })
  status: ProductStatus;

  brandId: string;
}

export class TotalOfferViewDto {
  @ApiProperty()
  @IsUUID()
  offerId: string;

  @ApiProperty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  end: Date;

  brandId: string;
}

export class RewardAnalyticsDto {
  @ApiProperty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  end: Date;

  brandId: string;

  @ApiProperty()
  @IsUUID()
  rewardId: string;

  @ApiProperty({
    type: 'enum',
  })
  @IsEnum(RewardCirculationFilter, {
    message: 'Please use a valid status',
  })
  sortBy: RewardCirculationFilter;
}

export class RewardTransactionDto {
  @ApiProperty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  end: Date;

  brandId: string;

  @ApiProperty()
  @IsUUID()
  rewardId: string;

  @ApiProperty()
  @IsNumberString()
  page: number;

  @ApiProperty()
  @IsNumberString()
  limit: number;
}

export class RewardHoldersDto {
  @ApiProperty()
  @IsUUID()
  rewardId: string;

  brandId: string;
}
