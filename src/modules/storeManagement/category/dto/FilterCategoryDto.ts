import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '@src/utils/enums/CategoryType';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterCategoryDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty({
    enum: CategoryType,
  })
  @IsOptional()
  @IsEnum(CategoryType, {
    message: 'Category type is invalid',
  })
  type: CategoryType;
}
