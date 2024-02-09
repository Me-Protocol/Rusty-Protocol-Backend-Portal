import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class IssueMeCreditsDto {
  @ApiProperty()
  @IsUUID()
  brandId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
