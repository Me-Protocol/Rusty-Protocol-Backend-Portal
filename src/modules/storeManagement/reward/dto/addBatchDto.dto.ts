import { ApiProperty } from '@nestjs/swagger';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { IsArray, IsString } from 'class-validator';

export class AddBatchDto {
  @ApiProperty()
  @IsString()
  rewardId: string;

  @ApiProperty()
  @IsString()
  description: string;

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
