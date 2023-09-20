import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OnboardBrandDto {
  @ApiProperty()
  @IsString()
  walletAddress: string;

  @ApiProperty()
  @IsString()
  website: string;

  brandId: string;
}
