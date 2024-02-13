import { ApiProperty } from '@nestjs/swagger';
import { VoucherType } from '@src/utils/enums/VoucherType';
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
        type: {
          type: 'string',
          enum: Object.values(VoucherType),
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
    type: VoucherType;
  }[];
}
