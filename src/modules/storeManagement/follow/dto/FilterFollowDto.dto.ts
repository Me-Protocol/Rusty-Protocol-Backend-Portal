import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FilterFollowDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty()
  @IsString()
  brandId: string;
}

export class FilteUserFollowDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  userId: string;
}
