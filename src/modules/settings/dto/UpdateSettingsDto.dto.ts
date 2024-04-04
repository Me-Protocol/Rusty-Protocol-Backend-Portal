import { IsOptional, IsNumber, IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  maximumRLimit?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  minimumRewardAmountForConversion?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  minimumMeAmountForConversion?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  notifyRewardAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  notifyMeTokenAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  minimumOpenRewardSetupFactor?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  maximumOpenRewardSetupFactor?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rewardAutoTopUpFactor?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  meAutoTopUpFactor?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  meTokenValue?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  walletVersion?: number;
}
