import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image: string;

  // @ApiProperty()
  userId: string;

  @ApiProperty({
    enum: ItemStatus,
  })
  @IsOptional()
  @IsEnum(ItemStatus, {
    message: 'Please provide a valid status',
  })
  status: ItemStatus;

  // @ApiProperty()
  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsArray({
    message: 'Products must be an array of strings',
  })
  products: string[];

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;
}
