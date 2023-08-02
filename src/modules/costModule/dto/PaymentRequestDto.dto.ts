import { CallWithERC2771Struct } from '@gelatonetwork/relay-sdk/dist/lib/erc2771/types';
import { ApiProperty } from '@nestjs/swagger';
import { supportedNetworks } from '@src/globalServices/costManagement/symbol-finder.service';
import { PaymentRequestTnxType } from '@src/utils/enums/PaymentRequestTnxType';
import { IsEnum, IsObject, IsString } from 'class-validator';

export class PaymentRequestDto {
  brandId: string;

  @ApiProperty()
  @IsEnum(PaymentRequestTnxType, {
    message: 'Please provide a valid transaction type',
  })
  tnxType: PaymentRequestTnxType;

  @ApiProperty()
  @IsString()
  narration: string;

  @ApiProperty()
  @IsEnum(supportedNetworks, {
    message: 'Please provide a valid network',
  })
  network: supportedNetworks;

  @ApiProperty()
  @IsString()
  signature: string;

  @ApiProperty()
  @IsObject({
    message: 'Please provide a valid data object',
  })
  data: CallWithERC2771Struct;
}
