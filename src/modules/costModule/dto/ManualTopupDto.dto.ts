import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class ManualTopupDto {
  @ApiProperty()
  @IsNumber()
  liquidityAmount: number;

  @ApiProperty()
  @IsString()
  paymentMethodId: string;

  brandId: string;

  @ApiProperty({
    type: 'boolean',
  })
  @IsBoolean()
  useMeCredit: boolean;

  @ApiProperty()
  @IsUUID()
  planId: string;
}
