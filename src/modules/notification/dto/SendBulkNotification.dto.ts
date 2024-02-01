import { NotificationType } from '@src/utils/enums/notification.enum';
import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendBulkNotificationDto {
  @IsString()
  @IsEnum({ email: 'email', phone: 'phone' })
  @ApiProperty({ enum: { email: 'email', phone: 'phone' } })
  notification_type: 'email' | 'phone';

  @IsEnum(NotificationType)
  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsOptional()
  emailMessage?: string;

  @IsOptional()
  icon?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  orderId?: string;
}
