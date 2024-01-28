import { ApiProperty } from '@nestjs/swagger';
import { BrandRole } from '@src/utils/enums/BrandRole';
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
    enum: BrandRole,
  })
  @IsEnum(SyncIdentifierType, {
    message: 'Enter a valid identifier type',
  })
  identifierType: SyncIdentifierType;

  brandId: string;
}
