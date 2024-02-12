import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;
}
