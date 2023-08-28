import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetOfferDto {
  @ApiProperty({
    description: 'This is the session id of the user',
  })
  @IsString()
  sessionId: string;
}
