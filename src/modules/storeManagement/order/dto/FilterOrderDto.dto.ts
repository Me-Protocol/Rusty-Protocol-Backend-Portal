import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FilterOrderDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  userId: string;
}
