import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PayInvoiceDto {
  @ApiProperty()
  @IsString()
  paymentMethodId: string;

  @ApiProperty()
  @IsString()
  invoiceId: string;

  @ApiProperty({
    type: 'boolean',
  })
  @IsBoolean()
  useMeCredit: boolean;

  brandId: string;
}
