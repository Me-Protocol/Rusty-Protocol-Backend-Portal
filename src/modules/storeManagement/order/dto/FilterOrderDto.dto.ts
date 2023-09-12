import { ApiProperty } from '@nestjs/swagger';
import { OrderFilter } from '@src/utils/enums/OrderFilter';
import { IsEnum, IsOptional, IsString } from 'class-validator';

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
  filterBy: OrderFilter;

  userId: string;
}
