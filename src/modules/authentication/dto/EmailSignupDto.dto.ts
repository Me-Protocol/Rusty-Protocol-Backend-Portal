import { ApiProperty } from '@nestjs/swagger';
import { UserAppType } from '@src/utils/enums/UserAppType';
import {
  IsEmail,
  IsEnum,
  IsString,
  IsEthereumAddress,
  MinLength,
  IsOptional,
} from 'class-validator';

export class EmailSignupDto {
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'Email is invalid',
    },
  )
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  confirmPassword: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    enum: UserAppType,
    type: 'enum',
  })
  @IsEnum(UserAppType, {
    message: 'User type is invalid',
  })
  userType: UserAppType;

  @ApiProperty()
  @IsOptional()
  @IsEthereumAddress()
  walletAddress: string;
}
