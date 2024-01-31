import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SubscribeDto {
  @ApiProperty()
  @IsString()
  paymentMethodId: string;

  @ApiProperty()
  @IsString()
  planId: string;

  brandId: string;
}
