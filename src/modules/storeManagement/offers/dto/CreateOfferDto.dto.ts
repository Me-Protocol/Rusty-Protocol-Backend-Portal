import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOfferDto {
  @ApiProperty()
  @IsEnum(ProductStatus, {
    message: 'Please provide a valid status',
  })
  status: ProductStatus;

  brandId: string;

  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsArray()
  offerImages: string[];

  @ApiProperty()
  @IsNumber()
  originalPrice: number;

  @ApiProperty()
  @IsNumber()
  discountPercentage: number;

  @ApiProperty()
  @IsNumber()
  tokens: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  startDate: Date;

  @ApiProperty()
  @IsString()
  endDate: Date;

  @ApiProperty()
  @IsString()
  idOnBrandsite: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  rewardId: string;
}
