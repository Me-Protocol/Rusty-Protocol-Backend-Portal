import { HttpException, Injectable } from '@nestjs/common';
import { FiatWallet } from './entities/fiatWallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/paymentMethod';
import { Repository } from 'typeorm';
import { logger } from '../logger/logger.service';
import { Transaction } from './entities/transaction.entity';
import {
  StatusType,
  TransactionSource,
  TransactionsType,
} from '@src/utils/enums/Transactions';
import { FiatWalletService } from './fiatWallet.service';
import { PaymentMethodEnum } from '@src/utils/enums/PaymentMethodEnum';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentRepo: Repository<PaymentMethod>,

    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async createAccount() {
    const customer = await stripe.customers.create();

    return {
      customerId: customer.id,
      accountId: null,
    };
  }

  async createStripePaymentIntent(amount: number, wallet: FiatWallet) {
    try {
      //TODO: change back to auto after some payment is active
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        payment_method_types: ['card'],
        currency: 'usd',
        customer: wallet.stripeCustomerId,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      const ephemeralKey = await stripe.ephemeralKeys.create(
        {
          customer: wallet.stripeCustomerId,
        },
        { apiVersion: process.env.STRIPE_API_VERSION },
      );

      return {
        paymentIntent: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        ephemeralKey: ephemeralKey.secret,
        customer: wallet.stripeCustomerId,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      };
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  getDefaultPaymentMethod(walletId: string) {
    return this.paymentRepo.findOneBy({ walletId, isDefault: true });
  }

  async savePaymentMethodBrand(paymentMethodId: string, wallet: FiatWallet) {
    try {
      // check if payment method already exist

      const paymentMethod = await stripe.paymentMethods.retrieve(
        paymentMethodId,
      );

      const paymentMethodExist = await this.paymentRepo.findOneBy({
        stripePaymentMethodId: paymentMethod.id,
      });

      if (paymentMethodExist) {
        throw new HttpException('Payment method already exist', 400);
      }

      const paymentMethodBrand = await stripe.paymentMethods.attach(
        paymentMethodId,
        {
          customer: wallet.stripeCustomerId,
        },
      );

      const defaultPaymentMethod = await this.getDefaultPaymentMethod(
        wallet.id,
      );

      const newPaymentMethod = new PaymentMethod();
      newPaymentMethod.walletId = wallet.id;
      newPaymentMethod.stripePaymentMethodId = paymentMethodBrand.id;
      newPaymentMethod.isDefault = !defaultPaymentMethod;

      await this.paymentRepo.save(newPaymentMethod);

      return 'ok';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createAutoCardChargePaymentIntent(
    paymentMethodId: string,
    amount: number,
    customerId: string,
  ) {
    return stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      // confirm: true,
      customer: customerId,
    });
  }

  async confirmPaymentIntent(paymentIntentId: string) {
    return stripe.paymentIntents.confirm(paymentIntentId);
  }

  async getPaymentIntent(paymentIntentId: string) {
    return stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async getPaymentMethodsFromStripe(wallet: FiatWallet) {
    return await stripe.paymentMethods.list({
      customer: wallet.stripeCustomerId,
      type: 'card',
    });
  }

  async deletePaymentMethod(paymentMethodId: string) {
    return await stripe.paymentMethods.detach(paymentMethodId);
  }

  async getPaymentMethods(walletId: string) {
    return await this.paymentRepo.find({
      where: {
        walletId,
      },
    });
  }

  generateTransactionCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    return process.env.TNX_PREFIX + '-' + code;
  }

  async chargePaymentMethod({
    amount,
    paymentMethodId,
    wallet,
    narration,
  }: {
    amount: number;
    paymentMethodId: string;
    wallet: FiatWallet;
    narration: string;
  }) {
    const paymentIntent = await this.createAutoCardChargePaymentIntent(
      paymentMethodId,
      amount,
      wallet.stripeCustomerId,
    );

    await this.confirmPaymentIntent(paymentIntent.id);

    const paymentDetail = await this.getPaymentIntent(paymentIntent.id);

    // create transaction

    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.balance = wallet.balance;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = TransactionsType.DEBIT;
    transaction.paymentRef = this.generateTransactionCode();
    transaction.narration = narration;
    transaction.walletId = wallet.id;
    transaction.paymentMethod = PaymentMethodEnum.STRIPE;
    transaction.source = TransactionSource.AUTO_TOPUP;

    await this.transactionRepo.save(transaction);

    return paymentDetail;
  }
}
