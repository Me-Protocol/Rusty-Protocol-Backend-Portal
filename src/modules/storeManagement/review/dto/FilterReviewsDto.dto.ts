import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

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

  brandId: string;

  userId: string;
}
