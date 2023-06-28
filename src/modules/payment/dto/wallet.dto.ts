import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  userId: string;
}

export class CreateIntentDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  userId: string;
}

export class CreateWithdrawalRequestDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  methodId: string;
}

export class FundDto {
  @ApiProperty()
  @IsString()
  paymentIntent: string;
}

export class WithdrawalDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  linkedAccountId: string;
}

export class confirmWithdrawalDto {
  @ApiProperty()
  @IsNumber({}, { message: 'Please a valid code' })
  verificationCode: number;
}
