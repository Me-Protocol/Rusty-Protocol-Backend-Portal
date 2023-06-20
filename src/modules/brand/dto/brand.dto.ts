import { RevenueRange } from "@src/utils/enums/RevenueRange";
import { IsEnum, IsOptional, IsString, IsTaxId, IsUrl } from "class-validator";

export class CreateBrandDto {
  userId: string;
}

export class UpdateBrandDto {
  @IsOptional()
  @IsString({
    message: "Enter a valid name",
  })
  name: string;

  @IsOptional()
  @IsUrl({}, { message: "Enter a valid website" })
  website: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsEnum(RevenueRange, {
    message: "Revenue range is invalid",
  })
  revenueRange: RevenueRange;

  @IsOptional()
  @IsTaxId()
  vatTaxId: string;

  @IsOptional()
  @IsString({
    message: "Enter a valid ecommerce platform",
  })
  ecommercePlatform: string;

  @IsOptional()
  @IsString({
    message: "Enter a valid loyalty program",
  })
  loyaltyProgram: string;

  slug: string;
}
