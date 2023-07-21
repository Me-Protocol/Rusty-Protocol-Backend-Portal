import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FIlterCollectionDto {
  userId: string;

  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  brandId: string;
}
