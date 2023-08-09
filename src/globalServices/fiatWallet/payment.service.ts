import { HttpException, Injectable } from '@nestjs/common';
import { FiatWallet } from './entities/fiatWallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/paymentMethod';
import { Repository } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentRepo: Repository<PaymentMethod>,
  ) {}

  async createAccount() {
    const customer = await stripe.customers.create();
    const account = await stripe.accounts.create({
      type: 'express',
      requested_capabilities: ['card_payments', 'transfers'],
    });

    return {
      customerId: customer.id,
      accountId: account.id,
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
      console.log(error);
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
      throw new HttpException(error.message, 400);
    }
  }

  async createAutoCardChargePaymentIntent(
    paymentMethodId: string,
    amount: number,
    customerId: string,
  ) {
    return stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      // confirm: true,
      customer: customerId,
    });
  }

  async confirmPaymentIntent(paymentIntentId: string) {
    return stripe.paymentIntents.confirm(paymentIntentId);
  }
}
