import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

export class FilterBrandDto {
  @ApiProperty()
  @IsOptional()
  categoryId: string;

  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty({
    description: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  @IsOptional()
  @IsString({
    message: 'order must be of this format "name:ASC" or "name:DESC"',
  })
  order: string;
}
