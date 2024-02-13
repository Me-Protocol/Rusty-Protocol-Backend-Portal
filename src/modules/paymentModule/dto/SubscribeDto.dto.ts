import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SubscribeDto {
  @ApiProperty()
  @IsString()
  paymentMethodId: string;

  @ApiProperty()
  @IsString()
  planId: string;

  @ApiProperty({
    type: 'boolean',
  })
  @IsBoolean()
  useMeCredit: boolean;

  brandId: string;
}
