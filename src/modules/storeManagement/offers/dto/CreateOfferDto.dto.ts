import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty()
  @IsEnum(ItemStatus, {
    message: 'Please provide a valid status',
  })
  status: ItemStatus;

  brandId: string;

  @ApiProperty()
  @IsString()
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
  @IsString()
  rewardId: string;
}
