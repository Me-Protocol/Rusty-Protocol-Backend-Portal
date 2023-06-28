import { ProductStatus } from '@src/utils/enums/ProductStatus';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  brandId: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsString()
  categoryId: string;
}
