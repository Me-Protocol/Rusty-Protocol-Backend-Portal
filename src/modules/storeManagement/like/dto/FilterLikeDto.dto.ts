import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterLikeDto {
  @ApiProperty()
  @IsString()
  orderBy: 'date_added' | 'expiring_soon' | 'new';

  @ApiProperty()
  @IsOptional()
  @IsString()
  collectionId?: string;

  @ApiProperty()
  @IsNumberString()
  page: number;

  @ApiProperty()
  @IsNumberString()
  limit: number;

  userId: string;
}
