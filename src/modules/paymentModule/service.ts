import { HttpException, Injectable } from '@nestjs/common';
import { PaymentService } from '@src/globalServices/fiatWallet/payment.service';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { logger } from '@src/globalServices/logger/logger.service';
import { BillerService } from '@src/globalServices/biller/biller.service';

@Injectable()
export class PaymentModuleService {
  constructor(
    private readonly walletService: FiatWalletService,
    private readonly paymentService: PaymentService,
    private readonly billerService: BillerService,
  ) {}

  async savePaymentMethodBrand(paymentMethodId: string, brandId: string) {
    try {
      const wallet = await this.walletService.getWalletByBrandId(brandId);

      return await this.paymentService.savePaymentMethodBrand(
        paymentMethodId,
        wallet,
      );
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getInvoices(query: { brandId: string; page: number; limit: number }) {
    try {
      return await this.billerService.getBrandInvoices(query);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async payInvoice(invoiceId: string, paymentMethodId: string) {
    try {
      const invoice = await this.billerService.getInvoiceById(invoiceId);
      if (!invoice) {
        throw new HttpException('Invoice not found', 404);
      }

      const bills = await this.billerService.getBillsByInvoiceId(invoiceId);

      const totalAmount = bills.reduce((a, b) => a + b.amount, 0);

      const wallet = await this.walletService.getWalletByBrandId(
        invoice.brandId,
      );

      const payment = this.paymentService.chargePaymentMethod({
        amount: totalAmount * 100,
        paymentMethodId,
        wallet,
        narration: `Payment for invoice ${invoice.invoiceCode}`,
      });

      return payment;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
