import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '@src/utils/enums/CategoryType';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterCategoryDto {
  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
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
