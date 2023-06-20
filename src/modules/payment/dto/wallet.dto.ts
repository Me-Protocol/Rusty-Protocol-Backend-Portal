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
  @IsNumber()
  amount: number;

  userId: string;

  @IsString()
  methodId: string;
}

export class FundDto {
  @IsString()
  paymentIntent: string;
}

export class WithdrawalDto {
  @IsNumber()
  amount: number;

  @IsString()
  linkedAccountId: string;
}

export class confirmWithdrawalDto {
  @IsNumber({}, { message: 'Please a valid code' })
  verificationCode: number;
}
