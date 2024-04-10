import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class AdminFilterInvoiceDto {
  @ApiPropertyOptional()
  @IsString()
  page: number;

  @ApiPropertyOptional()
  @IsString()
  limit: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  brandId?: string;

  @ApiPropertyOptional({
    description: 'Filter by paid status',
    type: Boolean,
  })
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false: value)
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by due status',
    type: Boolean,
  })
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
  @IsBoolean()
  @IsOptional()
  isDue?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'date-time', description: 'Start date for filtering invoices' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date-time', description: 'End date for filtering invoices' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  endDate?: Date;
}
