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
  Min,
} from 'class-validator';

export class VariantOptionDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  inventory: number;
}

export class VariantDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  isCustom: boolean;

  @ApiProperty({ type: [VariantOptionDto] })
  @IsArray()
  @IsNotEmpty({ message: 'Variants must have at least one option' })
  options: VariantOptionDto[];
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsArray({ message: 'Product images must be an array of strings' })
  productImages: string[];

  @ApiProperty()
  @IsEnum(ProductStatus, {
    message: 'Please provide a valid status',
  })
  status: ProductStatus;

  @ApiProperty()
  @IsNumber()
  @Min(1, { message: 'Price must be greater than 0' })
  price: number;

  @ApiProperty()
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
    message: 'Collections must be an array of strings',
  })
  collections: string[];

  @ApiProperty()
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
  @IsString()
  coverImage: string;
}
