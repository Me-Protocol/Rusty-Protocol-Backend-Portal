import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  userId: string;

  @ApiProperty()
  @IsString()
  offerId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}
