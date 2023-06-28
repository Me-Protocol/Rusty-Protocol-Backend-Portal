import { NotificationFormat } from '@src/utils/enums/NotificationFormat';
import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  bio: string;

  @IsString()
  location: string;

  @IsString()
  weight: string;

  @IsString()
  height: string;

  @IsString()
  profilePicture: string;

  @IsBoolean()
  login_2fa: boolean;

  @IsBoolean()
  deposit_2fa: boolean;

  @IsBoolean()
  withdraw_2fa: boolean;

  @IsArray()
  sizes: string[];

  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  news_notifications: NotificationFormat;

  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  offer_notifications: NotificationFormat;

  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  brand_notifications: NotificationFormat;

  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  expiring_notifications: NotificationFormat;

  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  point_notifications: NotificationFormat;

  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  order_notifications: NotificationFormat;

  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  other_notifications: NotificationFormat;
}
