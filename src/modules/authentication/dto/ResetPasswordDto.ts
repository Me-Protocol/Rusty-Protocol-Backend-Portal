import { IsString, MaxLength, MinLength } from 'class-validator';
import { PasswordDto } from './PasswordDto';

export class ResetPasswordDto extends PasswordDto {
  @IsString()
  userId: string;

  @MinLength(4, {
    message: 'Code is invalid',
  })
  @MaxLength(4, {
    message: 'Code is invalid',
  })
  code: number;
}
