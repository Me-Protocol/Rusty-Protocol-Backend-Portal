import { IsString, MaxLength, MinLength } from 'class-validator';
import { PasswordDto } from './PasswordDto';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto extends PasswordDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @MinLength(4, {
    message: 'Code is invalid',
  })
  @MaxLength(4, {
    message: 'Code is invalid',
  })
  code: number;
}
