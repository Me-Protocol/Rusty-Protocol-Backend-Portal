import { HttpException, Injectable } from '@nestjs/common';
import { PaymentService } from '@src/globalServices/fiatWallet/payment.service';
import { WalletService } from '@src/globalServices/fiatWallet/wallet.service';

@Injectable()
export class PaymentModuleService {
  constructor(
    private readonly walletService: WalletService,
    private readonly paymentService: PaymentService,
  ) {}

  async savePaymentMethodBrand(paymentMethodId: string, brandId: string) {
    try {
      const wallet = await this.walletService.getWalletByBrandId(brandId);

      return await this.paymentService.savePaymentMethodBrand(
        paymentMethodId,
        wallet,
      );
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
