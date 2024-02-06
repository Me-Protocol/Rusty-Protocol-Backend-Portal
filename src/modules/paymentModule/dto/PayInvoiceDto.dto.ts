import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PayInvoiceDto {
  @ApiProperty()
  @IsString()
  paymentMethodId: string;

  @ApiProperty()
  @IsString()
  invoiceId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  voucherCode: string;

  brandId: string;
}
