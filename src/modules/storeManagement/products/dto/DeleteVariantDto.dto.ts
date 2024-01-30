import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteVariantDto {
  @ApiProperty()
  @IsUUID()
  variantId: string;

  brandId: string;
}
