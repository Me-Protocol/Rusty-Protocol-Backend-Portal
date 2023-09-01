import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { IsArray, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateOfferDto {
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
  productImages: string[];

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
  @IsUUID()
  rewardId: string;
}
