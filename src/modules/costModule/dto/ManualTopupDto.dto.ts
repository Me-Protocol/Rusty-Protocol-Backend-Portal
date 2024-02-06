import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ManualTopupDto {
  @ApiProperty()
  @IsString()
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
