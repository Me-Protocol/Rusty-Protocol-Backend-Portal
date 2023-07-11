import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LikeDto {
  @ApiProperty()
  @IsString()
  offerId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  collectionId?: string;

  userId: string;
}
