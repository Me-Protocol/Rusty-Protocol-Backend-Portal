import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '@src/utils/enums/CategoryType';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
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
  @IsString()
  banner: string;

  @ApiProperty({
    enum: CategoryType,
  })
  @IsEnum(CategoryType, {
    message: 'Category type is invalid',
  })
  type: CategoryType;

  slug: string;
}
