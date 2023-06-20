import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Req,
  Query,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateIntentDto,
  FundDto,
  WithdrawalDto,
  confirmWithdrawalDto,
} from './dto/wallet.dto';
import { User } from '../user/entities/user.entity';

@UseInterceptors(ResponseInterceptor)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(AuthGuard())
  @Post('pay')
  createIntent(@Body() createIntentDto: CreateIntentDto, @Req() req: any) {
    const user = req.user as User;
    createIntentDto.userId = user.id;
    return this.walletService.createStripePaymentIntent(
      createIntentDto.amount,
      createIntentDto.userId,
    );
  }

  @UseGuards(AuthGuard())
  @Post('fund')
  fundWallet(@Body() fundDto: FundDto, @Req() req: any) {
    const user = req.user as User;
    return this.walletService.fundWallet(fundDto.paymentIntent, user.id);
  }

  @UseGuards(AuthGuard())
  @Get('cards')
  getPaymentCard(@Req() req: any) {
    const user = req.user as User;
    return this.walletService.getPaymentCards(user.id);
  }

  @UseGuards(AuthGuard())
  @Post('link-account')
  linkAccount(@Req() req: any, @Body() { type }: { type: string }) {
    const user = req.user as User;
    if (type === 'bank') {
      return this.walletService.createBankLinkToken(user.id);
    } else {
      return this.walletService.createDebitCardLinkToken(user.id);
    }
  }

  @UseGuards(AuthGuard())
  @Get('linked-accounts')
  getLinkedAccounts(@Req() req: any) {
    const user = req.user as User;
    return this.walletService.getLinkedAccounts(user.id);
  }

  @UseGuards(AuthGuard())
  @Delete('cards')
  deletePaymentCard(@Req() req: any, @Body() { id }: { id: string }) {
    const user = req.user as User;
    return this.walletService.removePaymentCard(user.id, id);
  }

  @UseGuards(AuthGuard())
  @Get('history')
  getHistory(
    @Req() req: any,
    @Query()
    {
      limit,
      page,
      type,
      fromDate,
      toDate,
    }: {
      limit: number;
      page: number;
      type: string;
      fromDate: string;
      toDate: string;
    },
  ) {
    const user = req.user as User;
    return this.walletService.getHistory(
      user.id,
      page,
      limit,
      type,
      fromDate,
      toDate,
    );
  }

  @UseGuards(AuthGuard())
  @Post('withdrawal/confirm')
  confirmWithdrawal(
    @Req() req: any,
    @Body(ValidationPipe)
    { verificationCode }: confirmWithdrawalDto,
  ) {
    const user = req.user as User;
    return this.walletService.confirmWithdrawal(user, verificationCode);
  }

  @UseGuards(AuthGuard())
  @Post('withdrawal')
  requestWithdrawal(
    @Req() req: any,
    @Body(ValidationPipe)
    { amount, linkedAccountId }: WithdrawalDto,
  ) {
    const user = req.user as User;
    return this.walletService.requestWithdrawal(user, amount, linkedAccountId);
  }
}
