import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { StatusType, TransactionsType } from '@src/utils/enums/Transactions';
import { User } from '../user/entities/user.entity';
import { Brand } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly brandService: BrandService,
  ) {}

  async minusWalletBalance({
    user,
    amount,
    transactionType,
    brand,
  }: {
    brand?: Brand;
    amount: number;
    transactionType: TransactionsType;
    user?: User;
  }) {
    brand.balance = brand.balance - amount;

    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.balance = brand.balance;
    transaction.userId = user.id;
    transaction.brandId = brand.id;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    await this.transactionRepo.save(transaction);

    if (brand) {
      await this.brandService.save(brand);
    }

    // if (user) {
    //   await this.userService.saveUser(user);
    // }

    return 'ok';
  }

  generateTransactionCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    return process.env.TNX_PREFIX + '-' + code;
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
    brand.balance = brand.balance + amount;

    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.balance = brand.balance;
    transaction.userId = user.id;
    transaction.brandId = brand.id;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    transaction.narration = narration;
    await this.transactionRepo.save(transaction);

    if (brand) {
      await this.brandService.save(brand);
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
    brand.balance = brand.balance - amount;

    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.balance = brand.balance;
    transaction.userId = user.id;
    transaction.brandId = brand.id;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    transaction.narration = narration;
    await this.transactionRepo.save(transaction);

    if (brand) {
      await this.brandService.save(brand);
    }

    return 'ok';
  }
}
