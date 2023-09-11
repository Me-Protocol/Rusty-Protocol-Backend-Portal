import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { SendTransactionData } from '../../reward/dto/distributeBatch.dto';

export class CreateOrderDto {
  userId: string;

  @ApiProperty()
  @IsString()
  offerId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

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
