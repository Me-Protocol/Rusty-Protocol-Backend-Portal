import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString({
    message: 'Please provide an identifier',
  })
  identifier: string;

  @ApiProperty()
  @MinLength(6, {
    message: 'Password is too short',
  })
  password: string;
}
