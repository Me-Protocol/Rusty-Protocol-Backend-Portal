import { ApiProperty } from '@nestjs/swagger';
import { OrderVerifier } from '@src/utils/enums/OrderVerifier';
import { IsEnum, IsString } from 'class-validator';

export class CompleteOrderDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsString()
  taskId: string;

  @ApiProperty({
    type: 'enum',
    enum: OrderVerifier,
  })
  @IsEnum(OrderVerifier)
  verifier: OrderVerifier;
}
