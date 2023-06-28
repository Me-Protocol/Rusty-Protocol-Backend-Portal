import { IsString } from 'class-validator';

export class UpdateDeviceTokenDto {
  @IsString()
  device_token: string;
}
