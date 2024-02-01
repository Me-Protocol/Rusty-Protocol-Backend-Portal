import { HttpException, Injectable } from '@nestjs/common';
import { PaymentService } from '@src/globalServices/fiatWallet/payment.service';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { logger } from '@src/globalServices/logger/logger.service';
import { BillerService } from '@src/globalServices/biller/biller.service';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { CreatePlanDto } from './dto/CreatePlanDto.dto';
import { MailService } from '@src/globalServices/mail/mail.service';
import { emailCode } from '@src/utils/helpers/email';

@Injectable()
export class PaymentModuleService {
  constructor(
    private readonly walletService: FiatWalletService,
    private readonly paymentService: PaymentService,
    private readonly billerService: BillerService,
    private readonly brandService: BrandService,
    private readonly mailService: MailService,
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

  async getPaymentMethods(brandId: string) {
    const wallet = await this.walletService.getWalletByBrandId(brandId);

    return await this.paymentService.getPaymentMethods(wallet.id);
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
    voucherCode: string,
  ) {
    return await this.brandService.subscribeBrandToPlan(
      brandId,
      planId,
      paymentMethodId,
      voucherCode,
    );
  }

  async createVouchers(discount: number, brandIds: string[]) {
    try {
      await Promise.all(
        brandIds.map(async (brandId) => {
          const brand = await this.brandService.getBrandById(brandId);

          if (brand) {
            const voucher = await this.billerService.createVoucher(
              discount,
              brandId,
            );

            await this.mailService.sendMail({
              to: brand.user.email,
              subject: `New Voucher gift`,
              text: `You have been gifted a voucher of ${discount}% discount on your next payment. Use the code ${voucher.code} to redeem your voucher.`,
              html: `
              <div>
                <p>You have been gifted a voucher of ${discount}% discount on your next payment. Use the code ${emailCode(
                { code: voucher.code },
              )} to redeem your voucher.</p>
              </div>
              `,
            });
          }
        }),
      );

      return 'ok';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getVoucherByCode(code: string) {
    return await this.billerService.getVoucherByCode(code);
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async checkBrandForTopup() {}

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async handleAutoTop() {}
}
