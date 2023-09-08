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

  @ApiProperty()
  @IsOptional()
  @IsEnum(OrderFilter, {
    message: 'Please provide a valid status',
  })
  filterBy: OrderFilter;

  userId: string;
}
