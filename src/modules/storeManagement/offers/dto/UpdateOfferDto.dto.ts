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

export class UpdateOfferDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(ProductStatus, {
    message: 'Please provide a valid status',
  })
  status: ProductStatus;

  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  offerImages: string[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  originalPrice: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discountPercentage: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  tokens: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  idOnBrandsite: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  rewardId: string;
}
