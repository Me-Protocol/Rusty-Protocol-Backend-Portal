import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from '@src/utils/enums/RewardType';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCustomerPointDto {
  @ApiProperty()
  @IsString()
  identifier: string;

  @ApiProperty()
  @IsString()
  rewardId: string;
}
