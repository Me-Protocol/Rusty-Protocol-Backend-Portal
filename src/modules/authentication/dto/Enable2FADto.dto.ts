import { ApiProperty } from '@nestjs/swagger';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import {
  IsBoolean,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class Enable2FADto {
  @ApiProperty()
  @IsBoolean()
  enable: boolean;

  @ApiProperty()
  @IsEnum(TwoFAType, {
    message: 'Invalid 2FA type',
  })
  twoFAType: TwoFAType;

  userId: string;
}
