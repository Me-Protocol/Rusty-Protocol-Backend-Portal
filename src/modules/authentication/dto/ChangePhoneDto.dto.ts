import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePhoneDto {
  @ApiProperty()
  @MinLength(4, {
    message: 'Code is invalid',
  })
  @MaxLength(4, {
    message: 'Code is invalid',
  })
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
