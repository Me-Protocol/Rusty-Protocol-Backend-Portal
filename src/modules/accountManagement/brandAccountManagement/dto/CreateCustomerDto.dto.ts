import { ApiProperty } from '@nestjs/swagger';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { IsEnum, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString({
    message: 'Enter a valid identifier',
  })
  identifier: string;

  @ApiProperty({
    type: 'enum',
    enum: SyncIdentifierType,
  })
  @IsEnum(SyncIdentifierType, {
    message: 'Enter a valid identifier type',
  })
  identifierType: SyncIdentifierType;

  @ApiProperty()
  @IsString()
  phone: string;

  brandId: string;
}
