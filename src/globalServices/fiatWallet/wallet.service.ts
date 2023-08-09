import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { StatusType, TransactionsType } from '@src/utils/enums/Transactions';
import { User } from '../user/entities/user.entity';
import { Brand } from '../brand/entities/brand.entity';
import { FiatWallet } from './entities/fiatWallet.entity';
import { PaymentService } from './payment.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,

    @InjectRepository(FiatWallet)
    private readonly walletRepo: Repository<FiatWallet>,

    private readonly paymentService: PaymentService,
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

  async getWalletByUserId(userId: string) {
    return this.walletRepo.findOneBy({ userId });
  }

  async getWalletByBrandId(brandId: string) {
    return this.walletRepo.findOneBy({ brandId });
  }

  async addBrandBalance({
    user,
    amount,
    transactionType,
    brand,
    narration,
  }: {
    brand?: Brand;
    amount: number;
    transactionType: TransactionsType;
    user?: User;
    narration: string;
  }) {
    const wallet = await this.walletRepo.findOne({
      where: { brandId: brand.id },
    });

    const initialBalance = wallet.balance * 100; // convert to cents
    const amountToAdd = amount * 100; // convert to cents

    const newBalanceInCents = initialBalance + amountToAdd;
    const newBalance = newBalanceInCents / 100;

    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.balance = wallet.balance;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    transaction.narration = narration;

    if (user) {
      transaction.userId = user.id;
    }

    if (brand) {
      transaction.brandId = brand.id;
    }

    await this.transactionRepo.save(transaction);

    if (brand) {
      wallet.balance = newBalance;
      await this.walletRepo.save(wallet);
    }

    return 'ok';
  }

  async minusBrandBalance({
    user,
    amount,
    transactionType,
    brand,
    narration,
  }: {
    brand?: Brand;
    amount: number;
    transactionType: TransactionsType;
    user?: User;
    narration: string;
  }) {
    const wallet = await this.walletRepo.findOne({
      where: { brandId: brand.id },
    });

    const initialBalance = wallet.balance * 100; // convert to cents
    const amountToAdd = amount * 100; // convert to cents

    const newBalanceInCents = initialBalance - amountToAdd;
    const newBalance = newBalanceInCents / 100;

    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.balance = wallet.balance;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    transaction.narration = narration;

    if (user) {
      transaction.userId = user.id;
    }

    if (brand) {
      transaction.brandId = brand.id;
    }

    await this.transactionRepo.save(transaction);

    if (brand) {
      wallet.balance = newBalance;
      await this.walletRepo.save(wallet);
    }

    return 'ok';
  }
}
