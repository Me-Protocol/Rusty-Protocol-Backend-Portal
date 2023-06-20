import { HttpException, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/wallet.dto';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { PaginationService } from '@src/utils/pagination';
import { MailService } from '../mail/mail.service';
import { User } from '../user/entities/user.entity';
import { WalletEntity } from './entities/wallet.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { WithdrawalMethodsEntity } from './entities/withdrawalMethods.entity';
import { WithdrawalRequestEntity } from './entities/withdrawalRequest.entity';
import { TransactionsType, StatusType } from '@src/utils/enums/Transactions';
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(WithdrawalMethodsEntity)
    private readonly withdrawalMethodRepository: Repository<WithdrawalMethodsEntity>,
    @InjectRepository(WithdrawalRequestEntity)
    private readonly withdrawalRequestRepo: Repository<WithdrawalRequestEntity>,
    // private readonly paginationService: PaginationService,
    private readonly mailService: MailService,
    private configService: ConfigService,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    const newWallet = new WalletEntity();
    const customer = await stripe.customers.create();
    const account = await stripe.accounts.create({
      type: 'express',
    });
    newWallet.userId = createWalletDto.userId;
    newWallet.stripeCustomerId = customer.id;
    newWallet.stripeAccountId = account.id;
    return this.walletRepository.save(newWallet);
  }

  async getWallet(userId: string) {
    return await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
  }

  async createStripePaymentIntent(amount: number, userId) {
    try {
      const wallet = await this.walletRepository.findOne({
        where: {
          userId,
        },
      });

      if (!wallet.stripeCustomerId) {
        const customer = await stripe.customers.create();
        wallet.stripeCustomerId = customer.id;
        await this.walletRepository.save(wallet);
      }

      if (!wallet.stripeAccountId) {
        const account = await stripe.accounts.create({
          type: 'express',
        });
        wallet.stripeAccountId = account.id;
        await this.walletRepository.save(wallet);
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
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

  async getHistory(
    userId: string,
    page: number,
    limit: number,
    type?: string,
    fromDate?: string,
    toDate?: string,
  ) {
    console.log(type, fromDate, toDate);
    // if (type && type !== 'all') {
    //   return await this.paginationService.paginate({
    //     page,
    //     limit,
    //     entity: Transaction,
    //     where: {
    //       userId,
    //       transactionType: type,
    //     },
    //     order: { createdAt: 'ASC' },
    //     url: '/wallet/history',
    //   });
    // }
    // if (fromDate && toDate) {
    //   const from = new Date(fromDate);
    //   const to = new Date(toDate);
    //   return await this.paginationService.paginate({
    //     page,
    //     limit,
    //     entity: Transaction,
    //     where: {
    //       userId,
    //       createdAt: Between(from, to),
    //     },
    //     order: { createdAt: 'DESC' },
    //     url: '/wallet/history',
    //   });
    // }
    // if (fromDate && toDate && type) {
    //   const from = new Date(fromDate);
    //   const to = new Date(toDate);
    //   return await this.paginationService.paginate({
    //     page,
    //     limit,
    //     entity: Transaction,
    //     where: {
    //       userId,
    //       createdAt: Between(from, to),
    //       transactionType: type,
    //     },
    //     order: { createdAt: 'DESC' },
    //     url: '/wallet/history',
    //   });
    // }
    // return await this.paginationService.paginate({
    //   page,
    //   limit,
    //   entity: Transaction,
    //   where: {
    //     userId,
    //   },
    //   order: { createdAt: 'DESC' },
    //   url: '/wallet/history',
    // });
  }

  async createWithdrawTransaction(
    amount: number,
    userId: string,
    methodId: string,
  ) {
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    const method = await this.withdrawalMethodRepository.findOne({
      where: {
        id: methodId,
      },
    });
    if (!method) {
      throw new HttpException('Method not found', 404);
    }
    if (amount > wallet.balance) {
      throw new HttpException('Insufficient balance', 400);
    }
    if (amount < method.min) {
      throw new HttpException(
        `Minimum withdrawal amount is ${method.min}`,
        400,
      );
    }
    if (amount > method.max) {
      throw new HttpException(
        `Maximum withdrawal amount is ${method.max}`,
        400,
      );
    }
    wallet.balance = wallet.balance - amount + method.fee;
    wallet.totalWithdraw = wallet.totalWithdraw + amount;
    await this.walletRepository.save(wallet);
    const withdrawalRequest = new WithdrawalRequestEntity();
    withdrawalRequest.amount = amount;
    withdrawalRequest.balance = wallet.balance;
    withdrawalRequest.userId = userId;
    withdrawalRequest.walletId = wallet.id;
    withdrawalRequest.methodId = methodId;
    await this.withdrawalRequestRepo.save(withdrawalRequest);
    const transaction = new TransactionEntity();
    transaction.amount = amount;
    transaction.balance = wallet.balance;
    transaction.userId = userId;
    transaction.walletId = wallet.id;
    transaction.status = StatusType.PROCESSING;
    transaction.transactionType = TransactionsType.PAYOUTS;
    return this.transactionRepo.save(transaction);
  }

  async fundWallet(paymentIntentId: string, userId: string) {
    const check = await this.transactionRepo.findOne({
      where: {
        paymentRef: paymentIntentId,
      },
    });
    if (check) {
      throw new HttpException('Transaction already processed', 400);
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      throw new HttpException('Transaction failed', 400);
    }
    const amount = paymentIntent.amount_received / 100;
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    wallet.balance = Number(wallet.balance) + amount;
    wallet.totalDeposit = Number(wallet.totalDeposit) + amount;
    await this.walletRepository.save(wallet);
    const transaction = new TransactionEntity();
    transaction.amount = amount;
    transaction.balance = wallet.balance;
    transaction.userId = userId;
    transaction.walletId = wallet.id;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = TransactionsType.FUNDINGS;
    transaction.paymentRef = paymentIntentId;
    transaction.paymentMethod = 'Stripe';

    return this.transactionRepo.save(transaction);
  }

  async createTransaction(
    paymentIntentId: string,
    userId: string,
    amountPaid: number,
    paymentType: 'wallet' | 'card',
    transactionType: TransactionsType,
  ) {
    if (paymentType === 'card') {
      const check = await this.transactionRepo.findOne({
        where: {
          paymentRef: paymentIntentId,
        },
      });
      if (check) {
        throw new HttpException('Transaction already processed', 400);
      }
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId,
      );
      if (paymentIntent.status !== 'succeeded') {
        throw new HttpException('Transaction failed', 400);
      }
      amountPaid = paymentIntent.amount_received / 100;
    } else {
      const wallet = await this.walletRepository.findOne({
        where: {
          userId,
        },
      });
      if (amountPaid > wallet.balance) {
        throw new HttpException('Insufficient balance', 400);
      }
      wallet.balance = wallet.balance - amountPaid;
      await this.walletRepository.save(wallet);
    }
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    const tnxCode = this.generateTransactionCode();
    const transaction = new TransactionEntity();
    transaction.amount = amountPaid;
    transaction.balance = wallet.balance;
    transaction.userId = userId;
    transaction.walletId = wallet.id;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef =
      paymentType === 'wallet' ? tnxCode : paymentIntentId;
    transaction.paymentMethod = paymentType === 'wallet' ? 'Wallet' : 'Stripe';
    return this.transactionRepo.save(transaction);
  }

  generateTransactionCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    return 'SYN-' + code;
  }

  async getPaymentMethods() {
    return await this.withdrawalMethodRepository.find();
  }

  async getPaymentCards(userId: string) {
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    const paymentMethods = await stripe.paymentMethods.list({
      customer: wallet.stripeCustomerId,
      type: 'card',
    });
    return paymentMethods.data;
  }

  async removePaymentCard(userId: string, cardId: string) {
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    const paymentMethods = await stripe.paymentMethods.detach(cardId);
    return paymentMethods;
  }
  async createBankLinkToken(userId: string) {
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    const accountLink = await stripe.accountLinks.create({
      account: wallet.stripeAccountId,
      refresh_url: `${this.configService.get<string>(
        'STRIPE_REFRESH_URL',
      )}?status=failed`,
      return_url: `${this.configService.get<string>(
        'STRIPE_REFRESH_URL',
      )}?status=success`,
      type: 'account_onboarding',
    });
    return accountLink;
  }
  async createDebitCardLinkToken(userId: string) {
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    const linkToken = await stripe.accounts.createPersonToken(
      wallet.stripeCustomerId,
    );
    return linkToken;
  }
  async getLinkedAccounts(userId: string) {
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    // get linked banks and debit cards
    const account = await stripe.accounts.retrieve(wallet.stripeAccountId, {
      expand: ['external_accounts'],
    });
    return account;
  }
  async requestWithdrawal(user: User, amount: number, linkedAccountId: string) {
    const { email, id: userId } = user;
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    if (amount > wallet.balance) {
      throw new HttpException('Insufficient balance', 400);
    }
    // generate reference code
    const referenceCode = 'WL_' + Math.floor(1000 + Math.random() * 9000);
    const withdrawalRequest = new WithdrawalRequestEntity();
    withdrawalRequest.amount = amount;
    withdrawalRequest.balance = wallet.balance;
    withdrawalRequest.userId = userId;
    withdrawalRequest.walletId = wallet.id;
    withdrawalRequest.stripeLinkedAccountId = linkedAccountId;
    withdrawalRequest.verificationCode = Math.floor(
      1000 + Math.random() * 9000,
    );
    withdrawalRequest.reference = referenceCode;
    await this.withdrawalRequestRepo.save(withdrawalRequest);
    const transaction = new TransactionEntity();
    transaction.amount = amount;
    transaction.balance = wallet.balance;
    transaction.userId = userId;
    transaction.walletId = wallet.id;
    transaction.status = StatusType.PROCESSING;
    transaction.transactionType = TransactionsType.PAYOUTS;
    transaction.paymentRef = referenceCode;
    await this.mailService.sendMail({
      to: email,
      subject: 'Confirm your withdrawal request',
      text: 'Confirm your withdrawal request',
      html: `
        <p>Hello 👋🏻,</p>
        <p>Use the code below to confirm your withdrawal of $${amount}.</p>
        <p>Code: ${withdrawalRequest.verificationCode}</p>
        `,
    });
    await this.transactionRepo.save(transaction);
    return 'ok';
  }

  async confirmWithdrawal(user: User, verificationCode: number) {
    const { id: userId } = user;
    const withdrawalRequest = await this.withdrawalRequestRepo.findOne({
      where: {
        userId,
        verificationCode,
      },
    });
    if (!withdrawalRequest) {
      throw new HttpException('Invalid verification code', 400);
    }
    withdrawalRequest.status = StatusType.SUCCEDDED;
    withdrawalRequest.verificationCode = null;
    await this.withdrawalRequestRepo.save(withdrawalRequest);
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    wallet.balance = wallet.balance - withdrawalRequest.amount;
    await this.walletRepository.save(wallet);
    const transaction = await this.transactionRepo.findOneBy({
      paymentRef: withdrawalRequest.reference,
    });
    transaction.status = StatusType.SUCCEDDED;
    await this.transactionRepo.save(transaction);
    // Process payment on stripe
    const payment = await stripe.payouts.create({
      amount: withdrawalRequest.amount * 100,
      currency: 'usd',
      method: 'instant',
      destination: withdrawalRequest.stripeLinkedAccountId,
    });
    return 'ok';
  }

  async addWalletBalance(
    userId: string,
    amount: number,
    transactionType: TransactionsType,
  ) {
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });
    wallet.balance = wallet.balance + amount;
    const transaction = new TransactionEntity();
    transaction.amount = amount;
    transaction.balance = wallet.balance;
    transaction.userId = userId;
    transaction.walletId = wallet.id;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    await this.transactionRepo.save(transaction);
    return await this.walletRepository.save(wallet);
  }
  async minusWalletBalance(
    userId: string,
    amount: number,
    transactionType: TransactionsType,
  ) {
    const wallet = await this.walletRepository.findOne({
      where: {
        userId,
      },
    });

    wallet.balance = wallet.balance - amount;
    const transaction = new TransactionEntity();
    transaction.amount = amount;
    transaction.balance = wallet.balance;
    transaction.userId = userId;
    transaction.walletId = wallet.id;
    transaction.status = StatusType.SUCCEDDED;
    transaction.transactionType = transactionType;
    transaction.paymentRef = this.generateTransactionCode();
    return await this.walletRepository.save(wallet);
  }
}
