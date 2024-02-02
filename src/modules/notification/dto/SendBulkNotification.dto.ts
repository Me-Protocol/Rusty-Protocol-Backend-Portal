import { NotificationType } from '@src/utils/enums/notification.enum';
import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendBulkNotificationDto {
  @IsString()
  @IsEnum({ email: 'email', phone: 'phone' })
  @ApiProperty({ enum: { email: 'email', phone: 'phone' } })
  notification_type: 'email' | 'phone';

  @IsEnum(NotificationType)
  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  message: string;

  @IsOptional()
  @ApiPropertyOptional()
  emailMessage?: string;

  @IsOptional()
  @ApiPropertyOptional()
  icon?: string;

  @IsOptional()
  @ApiPropertyOptional()
  image?: string;

  @IsOptional()
  @ApiPropertyOptional()
  orderId?: string;
}
