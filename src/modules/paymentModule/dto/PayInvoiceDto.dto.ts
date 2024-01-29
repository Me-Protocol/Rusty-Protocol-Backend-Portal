import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PayInvoiceDto {
  @ApiProperty()
  @IsString()
  paymentMethodId: string;

  @ApiProperty()
  @IsString()
  invoiceId: string;

  brandId: string;
}
