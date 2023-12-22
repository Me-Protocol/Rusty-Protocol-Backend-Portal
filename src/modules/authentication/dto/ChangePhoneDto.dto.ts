import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsPhoneNumber, IsString } from 'class-validator';

export class ChangePhoneDto {
  @ApiProperty()
  @IsNumberString()
  code: number;

  @ApiProperty()
  @IsPhoneNumber(undefined, {
    message: 'Phone number is invalid',
  })
  phone: string;

  @ApiProperty()
  @IsString()
  countryCode: string;

  // @ApiProperty()
  // @IsString()
  // countryAbbr: string;

  @ApiProperty()
  @IsString()
  countryName: string;
}

export class StartChangePhoneDto {
  @ApiProperty()
  @IsPhoneNumber(undefined, {
    message: 'Phone number is invalid',
  })
  phone: string;

  @ApiProperty()
  @IsString()
  countryCode: string;
}
