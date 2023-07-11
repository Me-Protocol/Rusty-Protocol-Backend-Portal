import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { VarientType } from '@src/utils/enums/VarientType';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  brandId: string;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsArray({ message: 'Product images must be an array of strings' })
  productImages: string[];

  @ApiProperty()
  @IsEnum(ItemStatus, {
    message: 'Please provide a valid status',
  })
  status: ItemStatus;

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
  @IsString()
  subCategoryId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        values: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        productId: {
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
  @IsArray({ message: 'Variants must be an array of objects' })
  variants: {
    name: VarientType;
    values: string[];
    productId: string;
    price: number;
    inventory: number;
  }[];
}
