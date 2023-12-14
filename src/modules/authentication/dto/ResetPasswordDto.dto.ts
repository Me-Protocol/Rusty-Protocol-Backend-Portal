import { IsNumberString, IsString } from 'class-validator';
import { PasswordDto } from './PasswordDto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto extends PasswordDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNumberString()
  code: number;
}
