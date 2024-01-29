import { HttpException, Injectable } from '@nestjs/common';
import { PaymentService } from '@src/globalServices/fiatWallet/payment.service';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { logger } from '@src/globalServices/logger/logger.service';
import { BillerService } from '@src/globalServices/biller/biller.service';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { CreatePlanDto } from './dto/CreatePlanDto.dto';

@Injectable()
export class PaymentModuleService {
  constructor(
    private readonly walletService: FiatWalletService,
    private readonly paymentService: PaymentService,
    private readonly billerService: BillerService,
    private readonly brandService: BrandService,
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

  async payInvoice(
    invoiceId: string,
    brandId: string,
    paymentMethodId: string,
  ) {
    try {
      const invoice = await this.billerService.getInvoiceById(invoiceId);
      if (!invoice) {
        throw new HttpException('Invoice not found', 404);
      }

      if (invoice.brandId !== brandId) {
        throw new HttpException('Invoice not found', 404);
      }

      if (invoice.isPaid) {
        throw new HttpException('Invoice already paid', 400);
      }

      const wallet = await this.walletService.getWalletByBrandId(
        invoice.brandId,
      );

      const payment = await this.paymentService.chargePaymentMethod({
        amount: invoice.total * 100,
        paymentMethodId,
        wallet,
        narration: `Payment for invoice ${invoice.invoiceCode}`,
      });

      invoice.isPaid = true;
      await this.billerService.saveInvoice(invoice);

      return payment;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createSubscription(body: CreatePlanDto) {
    return await this.brandService.createBrandSubscriptionPlan(body);
  }

  async getSubscriptionPlans() {
    return await this.brandService.getBrandSubscriptionPlans();
  }

  async subscribeToPlan(
    brandId: string,
    planId: string,
    paymentMethodId: string,
  ) {
    return await this.brandService.subscribeBrandToPlan(
      brandId,
      planId,
      paymentMethodId,
    );
  }
}
