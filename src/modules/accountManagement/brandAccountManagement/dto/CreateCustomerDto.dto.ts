import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber(undefined)
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  brandId: string;
}
