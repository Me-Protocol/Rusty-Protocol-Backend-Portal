import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Wallet');
@UseInterceptors(ResponseInterceptor)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(AuthGuard())
  @Get('')
  async getWallet(@Req() req: any) {
    const user = req.user;

    return await this.walletService.getSingleWallet(user.id);
  }

  @UseGuards(AuthGuard())
  @Get('/balances')
  async getWalletBalances(@Req() req: any) {
    const user = req.user;

    return await this.walletService.getWalletBalances(user.id);
  }

  @UseGuards(AuthGuard())
  @Get('/balances/:contractAddress')
  async getSingleWalletBalance(
    @Req() req: any,
    @Param('contractAddress') contractAddress: string,
  ) {
    const user = req.user;

    return await this.walletService.getSingleWalletBalance(
      user.id,
      contractAddress,
    );
  }

  @UseGuards(AuthGuard())
  @Get('/history')
  async getWalletHistory(
    @Req() req: any,
    @Query()
    query: {
      paginationToken?: string;
    },
  ) {
    const user = req.user;

    return await this.walletService.getWalletHistory(
      user.id,
      query.paginationToken,
    );
  }

  @UseGuards(AuthGuard())
  @Post('transfer')
  async transfer(
    @Req() req: any,
    @Body() body: { to: string; amount: string; contract: string },
  ) {
    const user = req.user;

    return await this.walletService.sendTokens(
      user.id,
      body.to,
      body.amount,
      body.contract,
    );
  }

  @UseGuards(AuthGuard())
  @Get('/transfer/:transferId')
  async getTransferStatus(
    @Req() req: any,
    @Param('transferId') transferId: string,
  ) {
    const user = req.user;

    return await this.walletService.getTransferStatus(user.id, transferId);
  }

  @UseGuards(AuthGuard())
  @Post('/signature')
  async generateNewSignature(@Req() req: any) {
    const user = req.user;

    return await this.walletService.generateNewSignature(user.id);
  }

  @UseGuards(AuthGuard())
  @Get('/signature/:signatureId')
  async getSignatureStatus(
    @Req() req: any,
    @Param('signatureId') signatureId: string,
  ) {
    const user = req.user;

    return await this.walletService.getSignatureStatus(user.id, signatureId);
  }
}
