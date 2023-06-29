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
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateIntentDto,
  CreateWalletDto,
  FundDto,
  WithdrawalDto,
  confirmWithdrawalDto,
} from './dto/wallet.dto';
import { PaymentService } from './payment.service';
import { User } from '@src/globalServices/user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment Wallet')
@UseInterceptors(ResponseInterceptor)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  //TODO: remove later
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT-auth')
  @Post('create-wallet')
  async createWallet(@Req() req: any): Promise<any> {
    const user = req.user as User;
    // const userDto = { userId: '5fdb9850-c3c4-468e-b4ae-3be1ec10db87' } as any;
    const userDto = { ...user, userId: user.id };
    const a = await this.paymentService.create({ ...userDto });
  }

  @UseGuards(AuthGuard())
  @Post('pay')
  createIntent(@Body() createIntentDto: CreateIntentDto, @Req() req: any) {
    const user = req.user as User;
    console.log(user);

    createIntentDto.userId = user.id;
    return this.paymentService.createStripePaymentIntent(
      createIntentDto.amount,
      createIntentDto.userId,
    );
  }

  @UseGuards(AuthGuard())
  @Post('fund')
  fundWallet(@Body() fundDto: FundDto, @Req() req: any) {
    const user = req.user as User;
    return this.paymentService.fundWallet(fundDto.paymentIntent, user.id);
  }

  @UseGuards(AuthGuard())
  @Get('cards')
  getPaymentCard(@Req() req: any) {
    const user = req.user as User;
    return this.paymentService.getPaymentCards(user.id);
  }

  @UseGuards(AuthGuard())
  @Post('link-account')
  linkAccount(@Req() req: any, @Body() { type }: { type: string }) {
    const user = req.user as User;
    if (type === 'bank') {
      return this.paymentService.createBankLinkToken(user.id);
    } else {
      return this.paymentService.createDebitCardLinkToken(user.id);
    }
  }

  @UseGuards(AuthGuard())
  @Get('linked-accounts')
  getLinkedAccounts(@Req() req: any) {
    const user = req.user as User;
    return this.paymentService.getLinkedAccounts(user.id);
  }

  @UseGuards(AuthGuard())
  @Delete('cards')
  deletePaymentCard(@Req() req: any, @Body() { id }: { id: string }) {
    const user = req.user as User;
    return this.paymentService.removePaymentCard(user.id, id);
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
    return this.paymentService.getHistory(
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
    return this.paymentService.confirmWithdrawal(user, verificationCode);
  }

  @UseGuards(AuthGuard())
  @Post('withdrawal')
  requestWithdrawal(
    @Req() req: any,
    @Body(ValidationPipe)
    { amount, linkedAccountId }: WithdrawalDto,
  ) {
    const user = req.user as User;
    return this.paymentService.requestWithdrawal(user, amount, linkedAccountId);
  }
}
