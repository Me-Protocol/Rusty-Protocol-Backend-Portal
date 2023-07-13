import { ApiProperty } from '@nestjs/swagger';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { IsArray, IsString } from 'class-validator';

export class UpdateBatchDto {
  @ApiProperty()
  @IsString()
  rewardId: string;

  @ApiProperty()
  @IsString()
  description: string;

  brandId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        identifier: {
          type: 'string',
        },
        identifierType: {
          type: 'string',
          enum: [SyncIdentifierType.EMAIL, SyncIdentifierType.PHONE],
        },
        amount: {
          type: 'number',
        },
      },
    },
  })
  @IsArray()
  syncData: {
    id: string;
    identifier: string;
    identifierType: SyncIdentifierType;
    amount: number;
  }[];
}
