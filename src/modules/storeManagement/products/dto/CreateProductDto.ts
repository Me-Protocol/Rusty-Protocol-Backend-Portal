import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
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
  @IsUUID()
  @IsNotEmpty({ message: 'Please provide a category id' })
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
}
