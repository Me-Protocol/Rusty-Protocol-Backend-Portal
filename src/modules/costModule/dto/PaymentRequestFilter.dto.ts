import { ApiProperty } from '@nestjs/swagger';
import { PaymentRequestTnxType } from '@src/utils/enums/PaymentRequestTnxType';
import { IsEnum, IsString } from 'class-validator';

export class PaymentRequestFilterDto {
  brandId: string;

  @ApiProperty()
  @IsEnum(PaymentRequestTnxType, {
    message: 'Please provide a valid transaction type',
  })
  tnxType: PaymentRequestTnxType;

  @ApiProperty()
  @IsString()
  narration: string;

  sourceReference: string;
}
