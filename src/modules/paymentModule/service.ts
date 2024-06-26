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
  DOLLAR_PRECISION,
  JSON_RPC_URL,
  OPEN_REWARD_DIAMOND,
  getLatestBlock,
  getPoolMeTokenDueForTopUp,
  meTokenToDollarInPrecision,
  brandService as protocolBrandService,
  relay,
} from '@developeruche/protocol-core';
import { SettingsService } from '@src/globalServices/settings/settings.service';
import { VoucherType } from '@src/utils/enums/VoucherType';
import {
  StatusType,
  TransactionSource,
  TransactionsType,
} from '@src/utils/enums/Transactions';
import { PaymentMethodEnum } from '@src/utils/enums/PaymentMethodEnum';
import { Transaction } from '@src/globalServices/fiatWallet/entities/transaction.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuditTrailService } from '@src/globalServices/auditTrail/auditTrail.service';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { BillType } from '@src/utils/enums/BillType';
import { BigNumber, ethers } from 'ethers';
import {
  GELATO_API_KEY,
  IN_APP_API_KEY,
  SERVER_URL,
} from '@src/config/env.config';
import { checkOrderStatusGelatoOrRuntime } from '@src/globalServices/costManagement/taskId-verifier.service';
import { OrderVerifier } from '@src/utils/enums/OrderVerifier';
import { AutoTopupStatus } from '@src/utils/enums/AutoTopStatus';
import { UserService } from '@src/globalServices/user/user.service';
import { LockingService } from '@src/globalServices/task-queue/locking.service';
import { FilterInvoiceDto } from './dto/FilterInvoiceDto.dto';
import { AdminFilterInvoiceDto } from './dto/AdminFilterInvoiceDto.dto';

@Injectable()
export class PaymentModuleService {
  constructor(
    private readonly walletService: FiatWalletService,
    private readonly auditTrailService: AuditTrailService,
    private readonly paymentService: PaymentService,
    private readonly billerService: BillerService,
    private readonly brandService: BrandService,
    private readonly mailService: MailService,
    private readonly settingsService: SettingsService,
    private readonly syncRewardService: SyncRewardService,
    private readonly userService: UserService,
    private readonly lockingService: LockingService,
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
  catch(error) {
    console.log(error, 'ERROR');
    logger.error(error);
    throw new HttpException(error.message, 400);
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

  async getAllInvoices(query: AdminFilterInvoiceDto) {
    try {
      return await this.billerService.getAllBrandInvoices(query);


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
          amount: amount.amountToPay * 100,
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

  // async getDueInvoices({
  //   userId,
  //   brandId,
  //   page,
  //   limit,
  // }: {
  //   userId: string;
  //   brandId?: string;
  //   page: number;
  //   limit: number;
  // }) {
  //   try {
  //     const result = await this.billerService.getBrandInvoices({
  //       brandId,
  //       page,
  //       limit,
  //     });

  //     const user = await this.userService.getUserById(userId);
  //     if (!user) throw new HttpException('User not found', 404);

      // const auditTrailEntry = {
      //   userId: userId,
      //   auditType: 'ACCESS_DUE_INVOICES',
      //   description: `${user.username} accessed due invoices for brand${brandId}, page ${page} with limit ${limit}.`,
      //   reportableId: brandId || 'N/A',
      // };

      // await this.auditTrailService.createAuditTrail(auditTrailEntry);

  //     return {
  //       dueInvoices: result.invoices,
  //       total: result.total,
  //       nextPage: result.nextPage,
  //       prevPage: result.prevPage,
  //     };
  //   } catch (error) {
  //     logger.error(error);
  //     throw new HttpException(error.message, 400);
  //   }
  // }

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

      console.log(totalPaymentAmount, 'TOTAL PAYMENT AMOUNT');

      if (totalPaymentAmount.amountToPay > 0.5) {
        console.log('PAYMENT METHOD ID', paymentMethodId);
        const paymentMethod =
          await this.paymentService.getPaymentMethodByStripePaymentMethodId(
            paymentMethodId,
          );

        if (!paymentMethod?.stripePaymentMethodId) {
          throw new HttpException('Please link your card first.', 400, {});
        }

        await this.paymentService.chargePaymentMethod({
          amount: totalPaymentAmount.amountToPay * 100,
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
      console.log(error, 'ERROR');
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
    const jobName = 'checkBrandForTopup';

    if (!this.lockingService.lock(jobName)) {
      console.log('Job is already running. Skipping...');
      return;
    }

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

          const nounce = item.currentDepositNonce;

          const checkNounce =
            await this.billerService.getAutoTopupRequestByNounce(nounce);

          if (!checkNounce || checkNounce.status === AutoTopupStatus.FAILED) {
            const amount = item.meNotifyLimit.mul(settings?.meAutoTopUpFactor);
            console.log(amount.toString(), 'INITIAL AMOUNT');
            const valueToDollar = await meTokenToDollarInPrecision(
              BigNumber.from(
                Math.ceil(Number(ethers.utils.formatEther(amount))),
              ),
            );
            const amountInDollar = Number(valueToDollar.toString());

            console.log(amount, 'amount');
            console.log(valueToDollar.toString(), 'valueToDollar');
            console.log(amountInDollar, 'amountInDollar');

            const rsvPermit =
              await this.syncRewardService.getTreasuryPermitAsync({
                brandId: brand.id,
                value: amount.toString(),
                spender: OPEN_REWARD_DIAMOND,
                createBill: false,
              });

            if (rsvPermit) {
              const autoTopup =
                await protocolBrandService.addLiquidityForOpenRewardsWithTreasuryAndMeDispenser_autoTopup(
                  item.meTokenAddress,
                  BigNumber.from(0),
                  amount,
                  rsvPermit.v,
                  rsvPermit.r,
                  rsvPermit.s,
                );

              const { meDispenser } = await this.settingsService.settingsInit();

              const provider = new ethers.providers.JsonRpcProvider(
                JSON_RPC_URL,
              );
              const wallet = new ethers.Wallet(meDispenser, provider);

              const input = {
                data: autoTopup?.data,
                from: wallet.address,
                to: OPEN_REWARD_DIAMOND,
              };

              try {
                const relayResponse = await relay(
                  input,
                  wallet,
                  IN_APP_API_KEY,
                  SERVER_URL,
                  GELATO_API_KEY,
                  brand.id,
                );
                console.log(relayResponse, 'TASK ID');
              } catch (error) {
                console.log('Error', error);
              }

              // if (relayResponse.taskId) {
              //   if (checkNounce) {
              //     checkNounce.taskId = taskId.taskId;
              //     checkNounce.status = AutoTopupStatus.PENDING;
              //     checkNounce.retry = 0;
              //     await this.billerService.saveAutoTopupRequest(checkNounce);
              //   } else {
              //     await this.billerService.createAutoTopupRequest({
              //       amount: amountInDollar,
              //       brandId: brand.id,
              //       nounce,
              //       taskId: taskId.taskId,
              //     });
              //   }
              // }
            }
          }
        }),
      );
    } catch (error) {
      logger.error(error);
      console.log('Error', error);
    } finally {
      this.lockingService.unlock(jobName);
    }
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCompleteAutoTop() {
    const jobName = 'handleCompleteAutoTop';

    if (!this.lockingService.lock(jobName)) {
      console.log('Job is already running. Skipping...');
      return;
    }

    try {
      const requests = await this.billerService.getPendingAutoTopupRequests();

      for (const request of requests) {
        const { taskId, brandId, amount } = request;

        const status = await checkOrderStatusGelatoOrRuntime(
          taskId,
          OrderVerifier.GELATO,
        );

        console.log(status);

        if (status === 'success') {
          await this.billerService.createBill({
            amount,
            brandId,
            type: BillType.AUTO_TOPUP,
          });
        } else if (status === 'failed') {
          request.status = AutoTopupStatus.FAILED;
          await this.billerService.saveAutoTopupRequest(request);
        } else {
          if (request.retry > 30) {
            request.status = AutoTopupStatus.FAILED;
            await this.billerService.saveAutoTopupRequest(request);
          } else {
            request.retry += 1;
            await this.billerService.saveAutoTopupRequest(request);
          }
        }
      }
    } catch (error) {
      logger.log(error);
      console.log('Error', error);
    } finally {
      this.lockingService.unlock(jobName);
    }
  }

  async issueMeCredits(brandId: string, amount: number, userId: string) {
    try {
      const brand = await this.brandService.getBrandById(brandId);
      if (!brand) throw new HttpException('Brand not found', 404);

      const brandWallet = await this.walletService.getWalletByBrandId(brandId);

      const previousCredit = brandWallet.meCredits;

      brandWallet.meCredits = Number(brandWallet.meCredits) + Number(amount);

      await this.walletService.save(brandWallet);

      const user = await this.userService.getUserById(userId);
      if (!user) throw new HttpException('User not found', 404);

      //Audit Trail Entry
      const auditTrailEntry = {
        userId: userId,
        auditType: 'ISSUE_ME_CREDITS',
        description: `${user.username} issued ${amount} ME credits to brand ${brand.name} successfully.  Previous credits: ${previousCredit}. New Credit: ${brandWallet.meCredits}`,
        reportableId: brandId,
      };
      await this.auditTrailService.createAuditTrail(auditTrailEntry);

      return {
        message: 'Me credits issued successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async RemoveMeCredits(userId: string, brandId: string, amount: number) {
    try {
      const brand = await this.brandService.getBrandById(brandId);
      if (!brand) throw new HttpException('Brand not found', 404);

      const brandWallet = await this.walletService.getWalletByBrandId(brandId);
      if(!brandWallet) throw new HttpException('Brand Wallet not found', 404);

      const previousCredit = brandWallet.meCredits;

      if (amount > previousCredit) {
        throw new HttpException('Cannot remove more credits than the current balance', 400);
      }

      brandWallet.meCredits = Number(brandWallet.meCredits) - Number(amount);

      await this.walletService.save(brandWallet);

      const user = await this.userService.getUserById(userId);
      if (!user) throw new HttpException('User not found', 404);

      const auditTrailEntry = {
        userId: userId,
        auditType: 'REMOVE_ME_CREDITS',
        description: `${user.username} removed ${amount} ME credits from ${brand.name} successfully. Previous credits: ${previousCredit}. New Credit: ${brandWallet.meCredits}`,
        reportableId: brandId,
      };

      await this.auditTrailService.createAuditTrail(auditTrailEntry);

      return {
        message: 'Me Credits removed successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createAutoTopupRequest({ brandId }: { brandId: string }) {
    try {
      const brand = await this.brandService.getBrandById(brandId);
      // const signature = await this.walletService.getBrandSignature(brandId);

      // await this.billerService.createAutoTopupRequest({
      //   amount: amountInDollar,
      //   brandId: brand.id,
      //   nounce,
      //   taskId: taskId.taskId,
      // });
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
