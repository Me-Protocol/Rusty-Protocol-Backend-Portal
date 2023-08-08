import { HttpException, Injectable } from '@nestjs/common';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { BrandService } from '@src/globalServices/brand/brand.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

@Injectable()
export class PaymentService {
  constructor(private readonly brandService: BrandService) {}

  async createAccount(brand: Brand) {
    const customer = await stripe.customers.create();
    const account = await stripe.accounts.create({
      type: 'express',
      requested_capabilities: ['card_payments', 'transfers'],
    });

    brand.stripeCustomerId = customer.id;
    brand.stripeAccountId = account.id;

    return await this.brandService.save(brand);
  }

  async createStripePaymentIntent(amount: number, brand: Brand) {
    try {
      if (!brand.stripeCustomerId || brand.stripeAccountId) {
        await this.createAccount(brand);
      }

      //TODO: change back to auto after some payment is active
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        payment_method_types: ['card'],
        currency: 'usd',
        customer: brand.stripeCustomerId,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      const ephemeralKey = await stripe.ephemeralKeys.create(
        {
          customer: brand.stripeCustomerId,
        },
        { apiVersion: process.env.STRIPE_API_VERSION },
      );

      return {
        paymentIntent: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        ephemeralKey: ephemeralKey.secret,
        customer: brand.stripeCustomerId,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async savePaymentMethodBrand(paymentMethodId: string, brand: Brand) {
    try {
      if (!brand.stripeCustomerId || !brand.stripeAccountId) {
        await this.createAccount(brand);
      }

      brand.stripePaymentMethodId = paymentMethodId;

      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: brand.stripeCustomerId,
      });

      await this.brandService.save(brand);

      return 'ok';
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async createAutoCardChargePaymentIntent(
    paymentMethodId: string,
    amount: number,
  ) {
    return stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });
  }

  async confirmPaymentIntent(paymentIntentId: string) {
    return stripe.paymentIntents.confirm(paymentIntentId);
  }
}
