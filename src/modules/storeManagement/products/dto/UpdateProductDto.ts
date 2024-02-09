import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { VarientType } from '@src/utils/enums/VarientType';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { VariantDto } from '@src/modules/storeManagement/products/dto/CreateProductDto';

export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsOptional()
  @IsArray({ message: 'Product images must be an array of strings' })
  productImages: string[];

  @ApiProperty()
  @IsOptional()
  @IsEnum(ProductStatus, {
    message: 'Please provide a valid status',
  })
  status: ProductStatus;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  inventory: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isUnlimited: boolean;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  subCategoryId: string;

  @ApiProperty({ type: [VariantDto] })
  @IsArray({ message: 'Variants must be an array' })
  @IsOptional()
  variants: VariantDto[];

  @ApiProperty()
  @IsOptional()
  @IsArray({
    message: 'Product images must be an array of strings',
  })
  collections: string[];

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  productUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  minAge: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  currencyId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  coverImage: string;
}
