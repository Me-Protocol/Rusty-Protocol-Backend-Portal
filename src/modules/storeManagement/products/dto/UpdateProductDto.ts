import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { VarientType } from '@src/utils/enums/VarientType';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
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
    message: 'Product images must be an array of strings',
  })
  collections: string[];

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  productUrl: string;
}
