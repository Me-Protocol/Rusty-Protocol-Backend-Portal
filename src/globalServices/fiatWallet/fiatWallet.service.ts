import { Injectable } from '@nestjs/common';
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

@Injectable()
export class FiatWalletService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,

    @InjectRepository(FiatWallet)
    private readonly walletRepo: Repository<FiatWallet>,

    private readonly paymentService: PaymentService,
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

    if (user) {
      wallet.userId = user.id;
    }

    if (brand) {
      wallet.brandId = brand.id;
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

    await this.checkCanPayCost(fiatWallet.id, fiatWallet.brandId);

    return 'ok';
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

    await this.checkCanPayCost(fiatWallet.id, fiatWallet.brandId);

    return 'ok';
  }

  async checkCanPayCost(walletId: string, brandId: string) {
    const brand = await this.brandService.getBrandById(brandId);
    const wallet = await this.walletRepo.findOneBy({ id: walletId });

    const minimumBalanceForNextBatchApp =
      this.brandServiceSubscription.getServiceCost(BrandSubServices.IN_APP);
    const minimumBalanceForNextBatchApi =
      this.brandServiceSubscription.getServiceCost(BrandSubServices.API);

    let triggerTopup: boolean = false;

    const checkInAppCost = await this.shouldCheckCost(
      brand,
      BrandSubServices.IN_APP,
    );
    const checkApiCost = await this.shouldCheckCost(
      brand,
      BrandSubServices.API,
    );

    if (wallet.balance < minimumBalanceForNextBatchApi && checkApiCost) {
      brand.canPayCost = false;
      await this.brandService.save(brand);

      triggerTopup = true;
    }

    if (wallet.balance < minimumBalanceForNextBatchApp && checkInAppCost) {
      brand.canPayCost_inApp = false;
      await this.brandService.save(brand);

      triggerTopup = true;
    }

    if (triggerTopup) {
      await this.fundBrandAccountForCostCollection(wallet, brand);
    }
  }

  async shouldCheckCost(brand: Brand, service: BrandSubServices) {
    if (brand.subscribedServices.includes(service)) {
      return true;
    }

    return false;
  }

  async fundBrandAccountForCostCollection(wallet: FiatWallet, brand: Brand) {
    const { topupAmountFactor } = this.settingsService.getCostSettings();

    const maximumCost = await this.brandServiceSubscription.getMaxServiceCost(
      brand.id,
    );

    const amount = maximumCost * topupAmountFactor;

    const defaultPaymentMethod =
      await this.paymentService.getDefaultPaymentMethod(wallet.id);

    const autoTopupAmount = brand.autoTopupAmount
      ? brand.autoTopupAmount
      : amount;

    if (defaultPaymentMethod?.stripePaymentMethodId) {
      try {
        // Create a payment intent to charge the user's card
        const paymentIntent =
          await this.paymentService.createAutoCardChargePaymentIntent(
            defaultPaymentMethod.stripePaymentMethodId,
            autoTopupAmount,
            wallet.stripeCustomerId,
          );

        // Confirm the payment intent (this will automatically attempt the charge on the user's card)
        await this.paymentService.confirmPaymentIntent(paymentIntent.id);

        // add to brand balance
        await this.addBrandBalance({
          fiatWallet: wallet,
          amount: autoTopupAmount,
          transactionType: TransactionsType.CREDIT,
          narration: 'Cost Reimbursement',
        });

        brand.canPayCost = true;
        brand.canPayCost_inApp = true;

        await this.brandService.save(brand);

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  }
}
