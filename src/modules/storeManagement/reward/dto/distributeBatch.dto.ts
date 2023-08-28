import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsUUID } from 'class-validator';
import { BigNumber } from 'ethers';

export class DistributeBatchDto {
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

  @ApiProperty()
  @IsUUID()
  rewardId: string;
}

export interface SendTransactionData {
  from: string;
  nonce: BigNumber;
  data: string;
  r: string;
  s: string;
  v: string;
  hash: string;
}
