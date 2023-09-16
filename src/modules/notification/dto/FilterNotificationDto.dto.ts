import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@src/utils/enums/notification.enum';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class FilterNotificationDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;

  @ApiProperty({
    type: 'array',
    description: 'Array of notification types',
  })
  @IsArray()
  @IsOptional()
  types: NotificationType[];

  userId: string;
}
