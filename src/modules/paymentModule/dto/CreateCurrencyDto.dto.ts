import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;
}
