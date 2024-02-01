import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty()
  @IsNumber()
  discount: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @IsArray()
  brandIds: string[];
}
