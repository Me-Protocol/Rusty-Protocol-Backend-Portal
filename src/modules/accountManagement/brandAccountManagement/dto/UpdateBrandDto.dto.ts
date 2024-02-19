import { ApiProperty } from '@nestjs/swagger';
import { BrandStore } from '@src/globalServices/brand-store/brand-store.dto';
import { RevenueRange } from '@src/utils/enums/RevenueRange';
import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsTaxId,
  IsUrl,
} from 'class-validator';

export class UpdateBrandDto {
  // @ApiProperty()
  // @IsOptional()
  // @IsString({
  //   message: 'Enter a valid name',
  // })
  // name: string;

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

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid slogan',
  })
  slogan: string;

  @ApiProperty({
    type: [Object],
  })
  @IsOptional()
  @IsArray({
    message: 'Enter a valid social media links',
  })
  socialMediaLinks: {
    name: string;
    link: string;
  }[];

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid logo_icon',
  })
  logo_icon: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid description',
  })
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid slogan',
  })
  logo_white: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid slogan',
  })
  logo_white_icon: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid slogan',
  })
  logo: string;

  @ApiProperty()
  @IsOptional()
  @IsArray({
    message: 'Enter a valid banners',
  })
  banners: string[];

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid supportPhoneNumber',
  })
  supportPhoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean({
    message: 'Enter a valid boolean value',
  })
  listOnStore: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vaultPercentage: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  noOfCustomers: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  region: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  additionalAddress: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  postalCode: number;

  @ApiProperty()
  @IsOptional()
  @IsBooleanString()
  firstTimeLogin: 'true' | 'false';

  @ApiProperty()
  @IsOptional()
  @IsObject()
  brandStore: BrandStore;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  regions: string[];
}
