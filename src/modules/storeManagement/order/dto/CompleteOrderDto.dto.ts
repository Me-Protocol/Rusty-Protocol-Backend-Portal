import { ApiProperty } from '@nestjs/swagger';
import { OrderVerifier } from '@src/utils/enums/OrderVerifier';
import { SpendData } from '@src/utils/types/spendData';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CompleteOrderDto {
  @ApiProperty()
  @IsUUID()
  orderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @ApiProperty({
    type: 'enum',
    enum: OrderVerifier,
  })
  @IsEnum(OrderVerifier)
  verifier: OrderVerifier;

  @ApiProperty({
    type: 'object',
  })
  @IsOptional()
  @IsObject({
    each: true,
  })
  spendData: SpendData;
}
