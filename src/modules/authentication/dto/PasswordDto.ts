import { Matches, MinLength } from 'class-validator';

export class PasswordDto {
  @MinLength(6, {
    message: 'Password is too short',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @MinLength(6, {
    message: 'Password is too short',
  })
  confirmPassword: string;

  currentPassword?: string;
}
