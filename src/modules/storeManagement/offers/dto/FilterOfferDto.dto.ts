import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterOfferDto {
  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  subCategory?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  brandId: string;

  userId: string;
}
