import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { SendTransactionData } from './distributeBatch.dto';

export class PushTransactionDto {
  @ApiProperty({
    type: 'object',
    example: {
      from: '0x000000',
      nonce: 0,
      data: '0x000000',
      r: '0x000000',
      s: '0x000000',
      v: '0x000000',
      hash: '0x000000',
    },
  })
  @IsObject({
    each: true,
  })
  params: SendTransactionData;
}

export class GetTreasuryPermitDto {
  @ApiProperty()
  @IsString()
  spender: string;

  @ApiProperty()
  @IsString()
  value: string;
}
