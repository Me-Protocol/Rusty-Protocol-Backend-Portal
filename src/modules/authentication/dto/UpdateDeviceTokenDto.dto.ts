import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateDeviceTokenDto {
  @ApiProperty()
  @IsString()
  device_token: string;
}
