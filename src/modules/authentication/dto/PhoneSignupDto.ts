import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@src/utils/enums/Gender';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import { UserAppType } from '@src/utils/enums/UserAppType';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PhoneSignupDto {
  @ApiProperty()
  @IsPhoneNumber(undefined, {
    message: 'Phone number is invalid',
  })
  phone: string;

  @ApiProperty()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  countryAbbr: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
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

  @ApiProperty()
  @IsEnum(UserAppType, {
    message: 'User type is invalid',
  })
  userType: UserAppType;
}
