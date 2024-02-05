import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '@src/utils/enums/CategoryType';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
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
  @IsOptional()
  @IsString()
  banner: string;

  @ApiProperty({
    enum: CategoryType,
  })
  @IsOptional()
  @IsEnum(CategoryType, {
    message: 'Category type is invalid',
  })
  type: CategoryType;

  slug: string;
}
