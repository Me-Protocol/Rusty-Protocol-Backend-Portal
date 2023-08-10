import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class SetAutoTopupAmountDto {
  @ApiProperty()
  @IsString()
  amount: number;
}
