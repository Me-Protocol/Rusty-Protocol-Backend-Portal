import { ApiProperty } from '@nestjs/swagger';
import { OrderFilter } from '@src/utils/enums/OrderFilter';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class GetShopifyTokenDto {
  brandId: string;
}
