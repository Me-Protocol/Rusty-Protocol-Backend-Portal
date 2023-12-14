import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

export class FilterFollowDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty()
  @IsUUID()
  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  sort: {
    createdAt: FindOptionsOrderValue;
  };
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
