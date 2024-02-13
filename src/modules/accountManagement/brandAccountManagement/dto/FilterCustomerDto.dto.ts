import { ApiProperty } from '@nestjs/swagger';
import { FilterBrandCustomer } from '@src/utils/enums/FilterBrandCustomer';
import {
  IsBoolean,
  IsBooleanString,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

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

  @ApiProperty()
  @IsOptional()
  @IsObject()
  sort: {
    createdAt: FindOptionsOrderValue;
  };

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    description: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  @IsOptional()
  @IsString({
    message: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  order: string;

  @ApiProperty()
  @IsOptional()
  @IsBooleanString()
  isOnboarded: boolean;
}

export class FilterActivePendingCustomerDto {
  @ApiProperty({
    type: 'enum',
    enum: ['active', 'pending'],
  })
  @IsOptional()
  @IsEnum(['active', 'pending'], {
    message: 'Type is invalid',
  })
  type: 'active' | 'pending';

  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty({
    description: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  @IsOptional()
  @IsString({
    message: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  order: string;

  brandId: string;
}
