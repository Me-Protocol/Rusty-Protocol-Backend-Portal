import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterLikeDto {
  @ApiProperty()
  @IsString()
  orderBy: 'date_added' | 'expiring_soon' | 'new';

  @ApiProperty()
  @IsOptional()
  @IsString()
  collectionId?: string;

  userId: string;
}
