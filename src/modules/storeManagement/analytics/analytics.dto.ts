import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class AnalyticsDto {
  @ApiProperty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
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
