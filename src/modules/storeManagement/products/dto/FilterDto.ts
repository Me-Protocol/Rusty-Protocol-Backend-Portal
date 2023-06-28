import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@src/utils/enums/ProductStatus';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  categoryId: string;
}
