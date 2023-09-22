import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogoutDeviceDto {
  @ApiProperty()
  @IsString({
    message: 'Please provide an deviceId',
  })
  deviceId: string;
}
