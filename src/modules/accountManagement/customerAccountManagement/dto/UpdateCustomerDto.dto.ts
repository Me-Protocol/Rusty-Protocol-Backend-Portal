import { ApiProperty } from '@nestjs/swagger';
import { NotificationFormat } from '@src/utils/enums/NotificationFormat';
import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCustomerWalletDto {
  @ApiProperty()
  @IsString()
  walletAddress: string;

  @ApiProperty()
  @IsNumber()
  walletVersion: number;
}

export class UpdateCustomerDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  weight: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  height: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profilePicture: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  walletAddress: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  login_2fa: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  deposit_2fa: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  withdraw_2fa: boolean;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  sizes: string[];

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  news_notifications: NotificationFormat;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  offer_notifications: NotificationFormat;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  brand_notifications: NotificationFormat;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  expiring_notifications: NotificationFormat;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  point_notifications: NotificationFormat;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  order_notifications: NotificationFormat;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationFormat, {
    message: 'Notification format is invalid',
  })
  other_notifications: NotificationFormat;

  @ApiProperty()
  @IsOptional()
  @IsBooleanString()
  firstTimeLogin: 'true' | 'false';
}
