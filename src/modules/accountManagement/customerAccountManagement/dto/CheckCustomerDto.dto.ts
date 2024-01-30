import { ApiProperty } from '@nestjs/swagger';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { IsEnum, IsString } from 'class-validator';

export class CheckCustomerDto {
  @ApiProperty()
  @IsString()
  identifier: string;

  @ApiProperty({
    type: 'enum',
    enum: SyncIdentifierType,
  })
  @IsEnum(SyncIdentifierType, {
    message: 'Enter a valid identifier type',
  })
  identifierType: SyncIdentifierType;
}
