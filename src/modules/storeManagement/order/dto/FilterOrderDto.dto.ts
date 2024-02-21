import { ApiProperty } from '@nestjs/swagger';
import { OrderFilter } from '@src/utils/enums/OrderFilter';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FilterOrderDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty({
    enum: OrderFilter,
    enumName: 'OrderFilter',
    description: 'Filter by status',
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderFilter, {
    message: 'Please provide a valid status',
  })
  filterBy?: OrderFilter;

  @ApiProperty({
    type: 'date',
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({
    type: 'date',
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  productId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  offerId?: string;

  userId: string;

  brandId: string;
}
