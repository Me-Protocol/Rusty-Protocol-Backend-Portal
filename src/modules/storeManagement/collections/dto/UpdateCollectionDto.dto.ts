import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { IsArray, IsEnum, IsString } from 'class-validator';

export class UpdateCollectionDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({
    enum: ItemStatus,
  })
  @IsEnum(ItemStatus, {
    message: 'Please provide a valid status',
  })
  status: ItemStatus;

  @ApiProperty()
  brandId: string;

  @ApiProperty()
  @IsArray({ message: 'Product images must be an array of strings' })
  products: string[];
}
