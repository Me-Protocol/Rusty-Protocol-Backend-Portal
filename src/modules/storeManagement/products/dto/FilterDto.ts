import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { OfferFilter, ProductFilter } from '@src/utils/enums/OfferFiilter';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FilterDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty()
  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ProductStatus, {
    message: 'Please provide a valid status',
  })
  status?: ProductStatus;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  subCategoryId: string;

  @ApiProperty({
    description: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  @IsOptional()
  @IsString({
    message: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  order: string;

  @ApiProperty({
    type: 'enum',
    enum: ProductFilter,
  })
  @IsOptional()
  @IsEnum(ProductFilter, {
    message: 'Please provide a valid filter',
  })
  filterBy: ProductFilter;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

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
  collectionId: string;
}
