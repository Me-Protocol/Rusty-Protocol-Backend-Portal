import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@src/utils/enums/notification.enum';
import { IsString } from 'class-validator';

export class FilterNotificationDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  userId: string;
}
