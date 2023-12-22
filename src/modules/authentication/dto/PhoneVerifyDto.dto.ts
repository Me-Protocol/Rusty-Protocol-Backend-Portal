import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class PhoneVerifyDto {
  @ApiProperty()
  @IsNumberString()
  code: number;
}
