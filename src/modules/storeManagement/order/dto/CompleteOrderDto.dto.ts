import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CompleteOrderDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsString()
  taskId: string;
}
