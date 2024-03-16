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

  async createAccount(email: string) {
    const customer = await stripe.customers.create({
      email,
    });

    return {
      customerId: customer.id,
      accountId: null,
    };
  }

  async updateStripeCustomerEmail(customerId: string, email: string) {
    return stripe.customers.update(customerId, {
      email,
    });
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
    narration: string,
  ) {
    return stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      // confirm: true,
      customer: customerId,
      description: narration,
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

  async deletePaymentMethod(id: string, walletId: string) {
    const paymentMethod = await this.paymentRepo.findOne({
      where: { id, walletId },
    });

    if (!paymentMethod) {
      throw new HttpException('Payment method not found', 404);
    }

    await stripe.paymentMethods.detach(paymentMethod.stripePaymentMethodId);

    await this.paymentRepo.delete(id);

    return 'ok';
  }

  async getPaymentMethodByStripePaymentMethodId(stripePaymentMethodId: string) {
    return await this.paymentRepo.findOne({
      where: {
        stripePaymentMethodId,
      },
    });
  }

  async getPaymentMethods(walletId: string) {
    const paymentMethods = await this.paymentRepo.find({
      where: {
        walletId,
      },
    });

    const paymentMethodsDetails = [];

    await Promise.all(
      paymentMethods.map(async (paymentMethod) => {
        const paymentMethodDetail = await stripe.paymentMethods.retrieve(
          paymentMethod.stripePaymentMethodId,
        );

        paymentMethodsDetails.push({
          ...paymentMethod,
          stripe: paymentMethodDetail,
        });
      }),
    );

    return paymentMethodsDetails;
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
    source,
    paymentMethod,
    appliedMeCredit,
  }: {
    amount: number;
    paymentMethodId: string;
    wallet: FiatWallet;
    narration: string;
    source: TransactionSource;
    paymentMethod: PaymentMethodEnum;
    appliedMeCredit?: boolean;
  }) {
    const paymentIntent = await this.createAutoCardChargePaymentIntent(
      paymentMethodId,
      amount,
      wallet.stripeCustomerId,
      narration,
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
    transaction.paymentMethod = paymentMethod;
    transaction.source = source;
    transaction.appliedMeCredit = appliedMeCredit;

    await this.transactionRepo.save(transaction);

    return paymentDetail;
  }

  async createTransaction(transaction: Transaction) {
    transaction.paymentRef = this.generateTransactionCode();

    await this.transactionRepo.save(transaction);
  }
}
