import { ProductStatus } from '@src/utils/enums/ProductStatus';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  brandId: string;

  @IsString()
  categoryId: string;

  @IsArray({ message: 'Product images must be an array of strings' })
  productImages: string[];

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsNumber()
  price: number;

  @IsNumber()
  inventory: number;

  @IsOptional()
  @IsBoolean()
  isUnlimited: boolean;
}
