import { IsEnum, IsOptional, IsString } from '@node_modules/class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@node_modules/@nestjs/swagger';
import { NotificationType } from '@src/utils/enums/notification.enum';

export class SendNotificationDto {
  @IsString()
  @IsEnum({ email: 'email', phone: 'phone' })
  @ApiProperty({ enum: { email: 'email', phone: 'phone' } })
  notification_type: 'email' | 'phone';

  @IsString()
  @ApiProperty()
  identifier: string;

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
