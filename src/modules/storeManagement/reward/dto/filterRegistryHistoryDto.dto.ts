import { ApiProperty } from '@nestjs/swagger';
import { TransactionsType } from '@src/utils/enums/Transactions';
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FilterRegistryHistoryDto {
  @ApiProperty({
    type: 'date',
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    type: 'date',
  })
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    type: 'enum',
    enum: TransactionsType,
  })
  @IsOptional()
  @IsEnum(TransactionsType, {
    message: 'Please use a valid transaction type',
  })
  transactionsType: TransactionsType;

  userId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  rewardId: string;

  @ApiProperty()
  @IsNumberString()
  page: number;

  @ApiProperty()
  @IsNumberString()
  limit: number;
}
