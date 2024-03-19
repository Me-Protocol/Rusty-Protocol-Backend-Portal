import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  userId: string;

  @ApiProperty()
  @IsUUID()
  offerId: string;

  @ApiProperty()
  @IsUUID()
  rewardId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumberString()
  amount: number;

  // @ApiProperty({
  //   type: 'object',
  //   example: {
  //     from: '0x000000',
  //     nonce: 0,
  //     data: '0x000000',
  //     r: '0x000000',
  //     s: '0x000000',
  //     v: '0x000000',
  //     hash: '0x000000',
  //   },
  // })
  // @IsObject({
  //   each: true,
  // })
  // params: SendTransactionData;
}
