import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckExistingRewardParams {
  @ApiProperty()
  @IsString()
  rewardName: string;

  @ApiProperty()
  @IsString()
  rewardSymbol: string;
}
