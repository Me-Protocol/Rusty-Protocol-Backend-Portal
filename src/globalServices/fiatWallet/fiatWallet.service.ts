import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { StatusType, TransactionsType } from '@src/utils/enums/Transactions';
import { User } from '../user/entities/user.entity';
import { Brand } from '../brand/entities/brand.entity';
import { FiatWallet } from './entities/fiatWallet.entity';
import { PaymentService } from './payment.service';
import { BrandService } from '../brand/brand.service';
import { SettingsService } from '../settings/settings.service';
import { BrandSubscriptionService } from '../brand/brandSeviceSubscription.service';
import { BrandSubServices } from '@src/utils/enums/BrandSubServices';
import { logger } from '../logger/logger.service';

@Injectable()
export class FiatWalletService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,

    @InjectRepository(FiatWallet)
    private readonly walletRepo: Repository<FiatWallet>,

    private readonly paymentService: PaymentService,

    @Inject(forwardRef(() => BrandService))
    private readonly brandService: BrandService,

    private readonly settingsService: SettingsService,
    private readonly brandServiceSubscription: BrandSubscriptionService,
  ) {}

  generateTransactionCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    return process.env.TNX_PREFIX + '-' + code;
  }

  async createWallet({
    user,
    brand,
  }: {
    user?: User;
    brand?: Brand;
  }): Promise<FiatWallet> {
    const wallet = new FiatWallet();
    let checkWallet: FiatWallet;

    if (user) {
      wallet.userId = user.id;
      checkWallet = await this.walletRepo.findOneBy({ userId: user.id });
    }

    if (brand) {
      wallet.brandId = brand.id;
      checkWallet = await this.walletRepo.findOneBy({ brandId: brand.id });
    }

    if (checkWallet) {
      return checkWallet;
    }

    const stripeAccount = await this.paymentService.createAccount();

    wallet.stripeAccountId = stripeAccount.accountId;
    wallet.stripeCustomerId = stripeAccount.customerId;

    return await this.walletRepo.save(wallet);
  }

  async save(wallet: FiatWallet) {
    return this.walletRepo.save(wallet);
  }

  async getAllTransactions(walletId: string) {
    return this.transactionRepo.find({
      where: { walletId },
      order: { createdAt: 'DESC' },
    });
  }

  async getWalletByUserId(userId: string) {
    return this.walletRepo.findOneBy({ userId });
  }

  async getWalletByBrandId(brandId: string) {
    return this.walletRepo.findOneBy({ brandId });
  }

  async addBrandBalance({
    amount,
    transactionType,
    narration,
    fiatWallet,
  }: {
    amount: number;
    transactionType: TransactionsType;
    narration: string;
    fiatWallet: FiatWallet;
  }) {
    const initialBalance = fiatWallet.balance * 100; // convert to cents
    const amountToAdd = amount * 100; // convert to cents

    const newBalanceInCents = initialBalance + amountToAdd;
    const newBalance = newBalanceInCents / 100;

    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.balance = fiatWallet.balance;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    transaction.narration = narration;
    transaction.walletId = fiatWallet.id;

    await this.transactionRepo.save(transaction);

    fiatWallet.balance = newBalance;
    await this.walletRepo.save(fiatWallet);

    await this.checkCanPayCost(fiatWallet.brandId);

    return true;
  }

  async minusBrandBalance({
    fiatWallet,
    amount,
    transactionType,
    narration,
  }: {
    amount: number;
    transactionType: TransactionsType;
    narration: string;
    fiatWallet: FiatWallet;
  }) {
    if (fiatWallet.balance < amount) {
      await this.checkCanPayCost(fiatWallet.brandId);
      return false;
    }

    const initialBalance = fiatWallet.balance * 100; // convert to cents
    const amountToAdd = amount * 100; // convert to cents

    const newBalanceInCents = initialBalance - amountToAdd;
    const newBalance = newBalanceInCents / 100;

    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.balance = fiatWallet.balance;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    transaction.narration = narration;
    transaction.walletId = fiatWallet.id;

    await this.transactionRepo.save(transaction);

    fiatWallet.balance = newBalance;
    await this.walletRepo.save(fiatWallet);

    await this.checkCanPayCost(fiatWallet.brandId);

    return true;
  }

  async checkCanPayCost(brandId: string) {
    const brand = await this.brandService.getBrandById(brandId);
    const wallet = await this.walletRepo.findOneBy({ brandId: brand.id });

    const brandServices = await this.brandServiceSubscription.getBrandServices(
      brand.id,
    );

    if (!brandServices) return false;

    let triggerTopup = false;

    for (const service of brandServices) {
      const cost = await this.brandServiceSubscription.getServiceCost(service);

      const canPay = wallet.balance < cost ? false : true;

      switch (service) {
        case BrandSubServices.IN_APP:
          brand.canPayCost_inApp = canPay;
          await this.brandService.save(brand);
          triggerTopup = !canPay;

          break;

        case BrandSubServices.API:
          brand.canPayCost = canPay;
          await this.brandService.save(brand);
          triggerTopup = !canPay;
      }
    }

    if (triggerTopup) {
      return await this.fundBrandAccountForCostCollection(wallet, brand);
    }

    return true;
  }

  async fundBrandAccountForCostCollection(
    wallet: FiatWallet,
    brand: Brand,
    amount?: number,
    paymentMethodId?: string,
  ) {
    const { topupAmountFactor } = await this.settingsService.getCostSettings();

    const maximumCost = await this.brandServiceSubscription.getMaxServiceCost(
      brand.id,
    );

    const topupAmount = maximumCost * topupAmountFactor;

    const defaultPaymentMethod =
      await this.paymentService.getDefaultPaymentMethod(wallet.id);

    const autoTopupAmountInCent = amount
      ? amount
      : brand.autoTopupAmount
      ? brand.autoTopupAmount
      : topupAmount;

    const autoTopupAmountInDollar = autoTopupAmountInCent * 100;

    if (!brand.enableAutoTopup && !amount) {
      return false;
    }

    if (defaultPaymentMethod?.stripePaymentMethodId || paymentMethodId) {
      try {
        const paymentIntent =
          await this.paymentService.createAutoCardChargePaymentIntent(
            paymentMethodId ?? defaultPaymentMethod.stripePaymentMethodId,
            autoTopupAmountInDollar,
            wallet.stripeCustomerId,
          );

        await this.paymentService.confirmPaymentIntent(paymentIntent.id);

        const paymentDetail = await this.paymentService.getPaymentIntent(
          paymentIntent.id,
        );

        // add to brand balance
        await this.addBrandBalance({
          fiatWallet: wallet,
          amount: paymentDetail?.amount / 100,
          transactionType: TransactionsType.CREDIT,
          narration: 'Cost Reimbursement',
        });

        return true;
      } catch (error) {
        logger.error(error);
        return false;
      }
    } else {
      return false;
    }
  }

  async createTransaction({
    amount,
    wallet,
    transactionType,
    narration,
  }: {
    amount: number;
    wallet: FiatWallet;
    transactionType: TransactionsType;
    narration: string;
  }) {
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.balance = wallet.balance;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    transaction.narration = narration;
    transaction.walletId = wallet.id;

    return await this.transactionRepo.save(transaction);
  }

  async applyMeCredit({
    walletId,
    amount,
  }: {
    walletId: string;
    amount: number;
  }) {
    const wallet = await this.walletRepo.findOne({
      where: {
        id: walletId,
      },
    });

    // TODO: Use costgetter for this

    const meTokenValue = (await this.settingsService.getPublicSettings())
      .meTokenValue;

    const meCreditsInDollars = Number(wallet.meCredits) * Number(meTokenValue);

    if (meCreditsInDollars > 0) {
      const amountToPay =
        amount > meCreditsInDollars ? amount - meCreditsInDollars : 0;
      const meCreditsUsedInDollar =
        amount > meCreditsInDollars ? meCreditsInDollars : amount;
      const meCreditsUsed = meCreditsUsedInDollar / meTokenValue;

      wallet.meCredits = wallet.meCredits - meCreditsUsed;

      await this.walletRepo.save(wallet);

      return amountToPay;
    }

    return amount;
  }
}
