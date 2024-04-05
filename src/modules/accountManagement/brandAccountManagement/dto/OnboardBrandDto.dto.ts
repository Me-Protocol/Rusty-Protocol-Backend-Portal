import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class OnboardBrandDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  walletAddress: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  website: string;

  brandId: string;
}
