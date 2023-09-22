import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ReviewDto {
  @ApiProperty()
  @IsUUID()
  offerId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  review: string;

  @ApiProperty()
  @IsString()
  rating: number;

  userId: string;
}
