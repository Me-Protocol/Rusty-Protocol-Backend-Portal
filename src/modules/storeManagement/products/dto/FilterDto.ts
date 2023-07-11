import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ItemStatus, {
    message: 'Please provide a valid status',
  })
  status?: ItemStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  subCategoryId: string;
}
