import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePhoneDto {
  @MinLength(4, {
    message: 'Code is invalid',
  })
  @MaxLength(4, {
    message: 'Code is invalid',
  })
  code: number;

  @IsPhoneNumber(undefined, {
    message: 'Phone number is invalid',
  })
  phone: string;

  @IsString()
  countryCode: string;

  @IsString()
  countryAbbr: string;
}
