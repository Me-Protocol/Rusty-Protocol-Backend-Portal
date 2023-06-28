import { ApiProperty } from '@nestjs/swagger';
import { RevenueRange } from '@src/utils/enums/RevenueRange';
import { IsEnum, IsOptional, IsString, IsTaxId, IsUrl } from 'class-validator';

export class UpdateBrandDto {
  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid name',
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl({}, { message: 'Enter a valid website' })
  website: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RevenueRange, {
    message: 'Revenue range is invalid',
  })
  revenueRange: RevenueRange;

  @ApiProperty()
  @IsOptional()
  @IsTaxId()
  vatTaxId: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid ecommerce platform',
  })
  ecommercePlatform: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid loyalty program',
  })
  loyaltyProgram: string;

  @ApiProperty()
  slug: string;
}
