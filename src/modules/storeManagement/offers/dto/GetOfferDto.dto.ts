import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetOfferDto {
  @ApiProperty()
  @IsString()
  sessionId: string;
}
