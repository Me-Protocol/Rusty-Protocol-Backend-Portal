import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus, ProductStatus } from '@src/utils/enums/ItemStatus';
import { OfferFilter, OfferSort } from '@src/utils/enums/OfferFiilter';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FilterOfferDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  category?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  subCategory?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  brandId: string;

  userId: string;

  @ApiProperty({
    type: 'enum',
    enum: ProductStatus,
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({
    type: 'enum',
    enum: OfferFilter,
  })
  @IsOptional()
  @IsEnum(OfferFilter)
  orderBy: OfferFilter;

  @ApiProperty({
    type: 'enum',
    enum: OfferSort,
  })
  @IsOptional()
  @IsEnum(OfferSort)
  sort: OfferSort;

  @ApiProperty({
    description: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  @IsOptional()
  @IsString({
    message: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  order: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  productId: string;

  @ApiProperty({
    type: 'date',
  })
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    type: 'date',
  })
  @IsOptional()
  @IsDateString()
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  regionId: string;
}

export class FilterUserOfferDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty()
  @IsUUID()
  rewardId?: string;

  userId: string;
}
