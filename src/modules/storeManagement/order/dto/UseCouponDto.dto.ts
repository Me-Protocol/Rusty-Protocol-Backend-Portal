import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UseCouponDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  idOnBrandSite: string;

  brandId: string;
}
