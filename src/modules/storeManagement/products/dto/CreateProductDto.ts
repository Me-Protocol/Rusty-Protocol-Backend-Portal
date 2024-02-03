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

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        value: {
          type: 'string',
        },
        price: {
          type: 'number',
        },
        inventory: {
          type: 'number',
        },
      },
    },
  })
  @IsOptional()
  @IsArray({
    message: 'Variants must be an array of objects',
    // each: true,
  })
  variants: {
    name: VarientType;
    value: string;
    price: number;
    inventory: number;
  }[];

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
