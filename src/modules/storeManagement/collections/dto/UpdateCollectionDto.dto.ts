import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCollectionDto {
  @ApiProperty()
  @IsOptional()
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

  @ApiProperty()
  userId: string;

  @ApiProperty({
    enum: ItemStatus,
  })
  @IsOptional()
  @IsEnum(ItemStatus, {
    message: 'Please provide a valid status',
  })
  status: ItemStatus;

  @ApiProperty()
  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsArray({ message: 'Product images must be an array of strings' })
  products: string[];
}
