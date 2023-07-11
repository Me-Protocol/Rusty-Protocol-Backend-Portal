import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class ChangeEmailDto {
  @ApiProperty()
  @MinLength(4, {
    message: 'Code is invalid',
  })
  @MaxLength(4, {
    message: 'Code is invalid',
  })
  code: number;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'Email is invalid',
    },
  )
  email: string;
}
