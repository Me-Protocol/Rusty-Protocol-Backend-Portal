import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from '@src/utils/enums/RewardType';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterRewardDto {
  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  brandId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RewardType, {
    message: 'Reward type is invalid',
  })
  rewardType: RewardType;
}
