import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterReviewDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsUUID()
  offerId: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  brandId: string;

  userId: string;
}
