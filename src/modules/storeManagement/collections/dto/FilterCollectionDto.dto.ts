import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FIlterCollectionDto {
  userId: string;

  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  limit: number;
}
