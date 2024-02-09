import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentService } from '@src/globalServices/fiatWallet/payment.service';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { logger } from '@src/globalServices/logger/logger.service';
import { BillerService } from '@src/globalServices/biller/biller.service';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { CreatePlanDto } from './dto/CreatePlanDto.dto';
import { MailService } from '@src/globalServices/mail/mail.service';
import { emailCode } from '@src/utils/helpers/email';
import {
  getCurrentPoolState,
  getLatestBlock,
  getPoolMeTokenDueForTopUp,
  meTokenToDollar,
} from '@developeruche/protocol-core';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SettingsService } from '@src/globalServices/settings/settings.service';
import { BigNumber, ethers } from 'ethers';
import { VoucherType } from '@src/utils/enums/VoucherType';
import { calculateDiscount } from '@src/utils/helpers/calculateDiscount';
import {
  StatusType,
  TransactionSource,
  TransactionsType,
} from '@src/utils/enums/Transactions';
import { PaymentMethodEnum } from '@src/utils/enums/PaymentMethodEnum';
import { Transaction } from '@src/globalServices/fiatWallet/entities/transaction.entity';

@Injectable()
export class PaymentModuleService {
  constructor(
    private readonly walletService: FiatWalletService,
    private readonly paymentService: PaymentService,
    private readonly billerService: BillerService,
    private readonly brandService: BrandService,
    private readonly mailService: MailService,
    private readonly settingsService: SettingsService,
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

  async getMeCredits(brandId: string) {
    const wallet = await this.walletService.getWalletByBrandId(brandId);
    const settings = await this.settingsService.getPublicSettings();

    const meCreditsInDollars = wallet.meCredits * settings.meTokenValue;

    return {
      meCredits: wallet.meCredits,
      meCreditsInDollars,
    };
  }

  async getPaymentMethods(brandId: string) {
    const wallet = await this.walletService.getWalletByBrandId(brandId);

    return await this.paymentService.getPaymentMethods(wallet.id);
  }

  async deleteBrandPaymentMethod(id: string, brandId: string) {
    try {
      const wallet = await this.walletService.getWalletByBrandId(brandId);
      return await this.paymentService.deletePaymentMethod(id, wallet.id);
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
    useMeCredit: boolean,
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

      let amount = {
        amountToPay: invoice.total,
        meCreditsUsed: 0,
      };

      const wallet = await this.walletService.getWalletByBrandId(
        invoice.brandId,
      );

      if (useMeCredit) {
        const newAmount = await this.walletService.applyMeCredit({
          walletId: wallet.id,
          amount: invoice.total,
        });

        amount = newAmount;
      }

      if (amount.amountToPay > 0) {
        const paymentMethod =
          await this.paymentService.getPaymentMethodByStripePaymentMethodId(
            paymentMethodId,
          );

        if (!paymentMethod?.stripePaymentMethodId) {
          throw new HttpException('Please link your card first.', 400, {});
        }

        await this.paymentService.chargePaymentMethod({
          amount: amount.amountToPay,
          paymentMethodId,
          wallet,
          narration: `Payment for invoice ${invoice.invoiceCode}`,
          source: TransactionSource.INVOICE,
          paymentMethod: PaymentMethodEnum.STRIPE,
          appliedMeCredit: useMeCredit,
        });

        if (amount.meCreditsUsed > 0) {
          await this.walletService.debitMeCredits({
            walletId: wallet.id,
            amount: amount.meCreditsUsed,
          });
        }

        invoice.isPaid = true;
        await this.billerService.saveInvoice(invoice);

        return 'ok';
      } else {
        // Dont debit brand account

        const transaction = new Transaction();
        transaction.amount = amount.amountToPay;
        transaction.balance = wallet.balance;
        transaction.status = StatusType.SUCCEDDED;
        transaction.transactionType = TransactionsType.DEBIT;
        transaction.narration = `Payment for invoice ${invoice.invoiceCode}`;
        transaction.walletId = wallet.id;
        transaction.paymentMethod = PaymentMethodEnum.ME_CREDIT;
        transaction.source = TransactionSource.SUBSCRIPTION;
        transaction.appliedMeCredit = true;

        await this.paymentService.createTransaction(transaction);

        invoice.isPaid = true;
        await this.billerService.saveInvoice(invoice);

        return 'ok';
      }
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
    useMeCredit: boolean,
  ) {
    return await this.brandService.subscribePlan(
      brandId,
      planId,
      paymentMethodId,
      useMeCredit,
    );
  }

  async brandInitialOnboarding({
    brandId,
    liquidityAmount,
    paymentMethodId,
    useMeCredit,
    planId,
  }: {
    brandId: string;
    liquidityAmount: number;
    paymentMethodId: string;
    useMeCredit: boolean;
    planId: string;
  }) {
    try {
      const wallet = await this.walletService.getWalletByBrandId(brandId);

      const plan = await this.brandService.getBrandSubscriptionPlanById(planId);
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }

      let totalPaymentAmount = {
        amountToPay: liquidityAmount + plan.monthlyAmount,
        meCreditsUsed: 0,
      };
      totalPaymentAmount = {
        ...totalPaymentAmount,
        amountToPay: +totalPaymentAmount.amountToPay.toFixed(2),
      };

      if (useMeCredit) {
        const newAmount = await this.walletService.applyMeCredit({
          walletId: wallet.id,
          amount: totalPaymentAmount.amountToPay,
        });

        totalPaymentAmount = newAmount;
      }

      if (totalPaymentAmount.amountToPay > 0) {
        const paymentMethod =
          await this.paymentService.getPaymentMethodByStripePaymentMethodId(
            paymentMethodId,
          );

        if (!paymentMethod?.stripePaymentMethodId) {
          throw new HttpException('Please link your card first.', 400, {});
        }

        await this.paymentService.chargePaymentMethod({
          amount: totalPaymentAmount.amountToPay,
          paymentMethodId,
          wallet,
          narration: `Payment for ${plan.name} subscription`,
          source: TransactionSource.SUBSCRIPTION,
          paymentMethod: PaymentMethodEnum.STRIPE,
          appliedMeCredit: useMeCredit,
        });

        if (totalPaymentAmount.meCreditsUsed > 0) {
          await this.walletService.debitMeCredits({
            walletId: wallet.id,
            amount: totalPaymentAmount.meCreditsUsed,
          });
        }

        await this.brandService.subscribeBrandToPlan(brandId, planId);

        return 'ok';
      } else {
        // Dont debit brand account

        await this.brandService.subscribeBrandToPlan(brandId, planId);

        const transaction = new Transaction();
        transaction.amount = totalPaymentAmount.amountToPay;
        transaction.balance = wallet.balance;
        transaction.status = StatusType.SUCCEDDED;
        transaction.transactionType = TransactionsType.DEBIT;
        transaction.narration = `Payment for ${plan.name} subscription`;
        transaction.walletId = wallet.id;
        transaction.paymentMethod = PaymentMethodEnum.ME_CREDIT;
        transaction.source = TransactionSource.SUBSCRIPTION;
        transaction.appliedMeCredit = true;

        await this.paymentService.createTransaction(transaction);

        return 'ok';
      }
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {});
    }
  }

  async createVouchers(
    vouchers: {
      brandId: string;
      planId: string;
      discount: number;
      usageLimit: number;
      type: VoucherType;
    }[],
  ) {
    try {
      await Promise.all(
        vouchers.map(async (item) => {
          const brand = await this.brandService.getBrandById(item.brandId);

          if (!brand) {
            throw new HttpException('Brand not found', 404);
          }

          const plan = await this.brandService.getBrandSubscriptionPlanById(
            item.planId,
          );

          if (!plan) {
            throw new HttpException('Plan not found', 404);
          }

          const voucher = await this.billerService.createVoucher(
            item.discount,
            item.brandId,
            item.planId,
            item.usageLimit,
            item.type,
          );

          const brandOwner = await this.brandService.getBrandOwner(brand.id);

          await this.mailService.sendMail({
            to: brandOwner.user.email,
            subject: `New Voucher gift`,
            text: `You have been gifted a voucher of ${item.discount}% discount on your next payment. Use the code ${voucher.code} to redeem your voucher.`,
            html: `
              <div>
                <p>You have been gifted a voucher of ${
                  item.discount
                }% discount on your next payment. Use the code ${emailCode({
              code: voucher.code,
            })} to redeem your voucher.</p>
              </div>
              `,
          });
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
  async checkBrandForTopup() {
    try {
      const lastBlock = await this.brandService.getLastTopupEventBlock();
      const fromBlock = lastBlock ? lastBlock.lastBlock : 45495364;

      const toBlock = await getLatestBlock();
      await this.brandService.saveTopupEventBlock(toBlock);

      const poolRewardBalance = await getPoolMeTokenDueForTopUp(
        fromBlock,
        toBlock,
      );

      //  remove duplicates
      const uniquePoolState = poolRewardBalance.filter(
        (v, i, a) =>
          a.findIndex((t) => t.meTokenAddress === v.meTokenAddress) === i,
      );

      const settings = await this.settingsService.getPublicSettings();

      await Promise.all(
        uniquePoolState.map(async (item) => {
          const brand = await this.brandService.getBrandByMeTokenAddress(
            item.meTokenAddress,
          );

          if (!brand) {
            return;
          }

          const amount = item.meNotifyLimit.mul(settings?.meAutoTopUpFactor);
          const amountInDollars = await meTokenToDollar(amount);

          console.log('Amount in dollars', amountInDollars.toString());

          // await this.billerService.createBill({
          //   amount: amount,
          //   brandId: brand.id,
          //   type:"auto-topup"

          // })
        }),
      );
    } catch (error) {
      logger.error(error);
      console.log('Error', error);
    }
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async handleAutoTop() {}

  async issueMeCredits(brandId: string, amount: number) {
    try {
      const brand = await this.brandService.getBrandById(brandId);
      if (!brand) throw new HttpException('Brand not found', 404);

      const brandWallet = await this.walletService.getWalletByBrandId(brandId);

      brandWallet.meCredits = brandWallet.meCredits + amount;

      await this.walletService.save(brandWallet);

      return {
        message: 'Me credits issued successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
