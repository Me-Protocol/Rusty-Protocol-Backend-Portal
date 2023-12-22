import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class Verify2FADto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNumberString()
  code: number;
}
