import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty()
  @IsString()
  query: string;

  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;
}
