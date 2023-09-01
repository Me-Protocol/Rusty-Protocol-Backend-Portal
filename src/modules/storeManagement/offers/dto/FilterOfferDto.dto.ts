import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus, ProductStatus } from '@src/utils/enums/ItemStatus';
import { OfferFilter, OfferSort } from '@src/utils/enums/OfferFiilter';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

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
}
