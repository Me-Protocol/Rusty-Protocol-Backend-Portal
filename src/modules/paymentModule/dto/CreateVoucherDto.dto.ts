import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        brandId: {
          type: 'string',
        },
        planId: {
          type: 'string',
        },
        discount: {
          type: 'number',
        },
        usageLimit: {
          type: 'number',
        },
      },
    },
  })
  @IsArray()
  vouchers: {
    brandId: string;
    planId: string;
    discount: number;
    usageLimit: number;
  }[];
}
