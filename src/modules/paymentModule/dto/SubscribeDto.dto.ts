import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SubscribeDto {
  @ApiProperty()
  @IsString()
  paymentMethodId: string;

  @ApiProperty()
  @IsString()
  planId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  voucherCode: string;

  brandId: string;
}
