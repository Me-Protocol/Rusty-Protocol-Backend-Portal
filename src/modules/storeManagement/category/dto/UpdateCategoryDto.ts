import { CategoryType } from "@src/utils/enums/CategoryType";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  banner: string;

  @IsEnum(CategoryType, {
    message: "Category type is invalid",
  })
  type: CategoryType;
}
