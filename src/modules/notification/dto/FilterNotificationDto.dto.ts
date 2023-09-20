import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@src/utils/enums/notification.enum';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterNotificationDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty({
    isArray: true,
    type: NotificationType,
    description: 'Array of notification types',
  })
  @IsArray()
  @IsOptional()
  @IsEnum(NotificationType, { each: true })
  types: NotificationType[];

  userId: string;
}
