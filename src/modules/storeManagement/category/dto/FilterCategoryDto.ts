import { CategoryType } from "@src/utils/enums/CategoryType";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterCategoryDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsOptional()
  @IsEnum(CategoryType, {
    message: "Category type is invalid",
  })
  type: CategoryType;
}
