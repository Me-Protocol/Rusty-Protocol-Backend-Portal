import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ManualTopupDto {
  @ApiProperty()
  @IsString()
  amount: number;

  @ApiProperty()
  @IsString()
  paymentMethodId: string;
}
