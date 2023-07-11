import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FollowDto {
  @ApiProperty()
  @IsString()
  brandId: string;

  userId: string;
}
