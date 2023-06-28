import { ApiProperty } from '@nestjs/swagger';
import { NotificationFormat } from '@src/utils/enums/NotificationFormat';
import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  weight: string;

  @ApiProperty()
  @IsString()
  height: string;

  @ApiProperty()
  @IsString()
  profilePicture: string;

  @ApiProperty()
  @IsBoolean()
  login_2fa: boolean;

  @ApiProperty()
  @IsBoolean()
  deposit_2fa: boolean;

  @ApiProperty()
  @IsBoolean()
  withdraw_2fa: boolean;

  @ApiProperty()
  @IsArray()
  sizes: string[];

  @ApiProperty()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  news_notifications: NotificationFormat;

  @ApiProperty()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  offer_notifications: NotificationFormat;

  @ApiProperty()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  brand_notifications: NotificationFormat;

  @ApiProperty()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  expiring_notifications: NotificationFormat;

  @ApiProperty()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  point_notifications: NotificationFormat;

  @ApiProperty()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  order_notifications: NotificationFormat;

  @ApiProperty()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  other_notifications: NotificationFormat;
}
