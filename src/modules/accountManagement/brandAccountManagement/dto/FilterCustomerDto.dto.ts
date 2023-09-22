import { ApiProperty } from '@nestjs/swagger';
import { FilterBrandCustomer } from '@src/utils/enums/FilterBrandCustomer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterCustomerDto {
  @ApiProperty({
    type: 'enum',
    enum: FilterBrandCustomer,
  })
  @IsOptional()
  @IsEnum(FilterBrandCustomer, {
    message: 'Filter is invalid',
  })
  filterBy: FilterBrandCustomer;

  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  brandId: string;
}
