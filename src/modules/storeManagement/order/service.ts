import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderService } from '@src/globalServices/order/order.service';
import { CreateOrderDto } from './dto/CreateOrderDto.dto';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { CouponService } from '@src/globalServices/order/coupon.service';
import { OfferService } from '@src/globalServices/offer/offer.service';
import { UserService } from '@src/globalServices/user/user.service';
import { Order } from '@src/globalServices/order/entities/order.entity';
import { FilterOrderDto } from './dto/FilterOrderDto.dto';
import { UseCouponDto } from './dto/UseCouponDto.dto';
import { logger } from '@src/globalServices/logger/logger.service';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CostModuleService } from '@src/globalServices/costManagement/costModule.service';
import { NotificationService } from '@src/globalServices/notification/notification.service';
import {
  StatusType,
  TransactionSource,
  TransactionsType,
} from '@src/utils/enums/Transactions';
import { Notification } from '@src/globalServices/notification/entities/notification.entity';
import { NotificationType } from '@src/utils/enums/notification.enum';
import { emailButton } from '@src/utils/helpers/email';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { RegistryHistory } from '@src/globalServices/reward/entities/registryHistory.entity';
import { OrderVerifier } from '@src/utils/enums/OrderVerifier';
import { RewardService } from '@src/globalServices/reward/reward.service';
import { RewardCirculation } from '@src/globalServices/analytics/entities/reward_circulation';
import { AnalyticsRecorderService } from '@src/globalServices/analytics/analytic_recorder.service';
import { Transaction } from '@src/globalServices/fiatWallet/entities/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generateTransactionCode } from '@src/utils/helpers/generateRandomCode';
import { PaymentMethodEnum } from '@src/utils/enums/PaymentMethodEnum';
import { SpendData } from '@src/utils/types/spendData';
import {
  get_transaction_by_hash_with_url,
  get_user_reward_balance_with_url,
  redistributed_failed_tx_with_url,
} from '@developeruche/runtime-sdk';
import { RUNTIME_URL } from '@src/config/env.config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BillerService } from '@src/globalServices/biller/biller.service';
import { ethers } from 'ethers';
import { createCoupon } from '@src/globalServices/online-store-handler/create-coupon';
import { WooCommerceHandler } from '@src/globalServices/online-store-handler/woocommerce';
import { checkBrandOnlineStore } from '@src/globalServices/online-store-handler/check-store';

@Injectable()
export class OrderManagementService {
  constructor(
    private readonly syncService: SyncRewardService,
    private readonly couponService: CouponService,
    private readonly offerService: OfferService,
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    private readonly brandService: BrandService,
    private readonly customerService: CustomerService,
    private readonly costModuleService: CostModuleService,
    private readonly notificationService: NotificationService,
    private readonly fiatWalletService: FiatWalletService,
    private readonly rewardService: RewardService,
    private readonly analyticsRecorder: AnalyticsRecorderService,
    private eventEmitter: EventEmitter2,
    private readonly billerService: BillerService,

    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  randomCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async redeem({ userId, offerId, quantity }: CreateOrderDto) {
    try {
      if (quantity === 0) {
        throw new Error('Quantity must be greater than 0');
      }

      const offer = await this.offerService.getOfferById(offerId);

      if (!offer) {
        throw new Error('Offer not found');
      }

      // check if offer has expired
      if (offer.endDate < new Date()) {
        throw new Error('Offer has expired');
      }
      const user = await this.userService.getUserById(userId);

      // let registry = await this.syncService.findOneRegistryByUserId(
      //   userId,
      //   offer.rewardId,
      // );

      // if (!registry) {
      //   const syncData = await this.rewardService.getRegistryByIdentifer(
      //     user.email,
      //     offer.rewardId,
      //   );

      //   if (syncData) {
      //     //  create registry
      //     const registryRecord = new RewardRegistry();
      //     registryRecord.rewardId = offer.rewardId;
      //     registryRecord.customerIdentiyOnBrandSite = syncData.identifier;
      //     registryRecord.customerIdentityType = syncData.identifierType;
      //     registryRecord.balance = 0;
      //     registryRecord.userId = user.id;

      //     registry = await this.syncService.addRegistry(registryRecord);

      //     // create transaction
      //     await this.syncService.creditReward({
      //       rewardId: offer.rewardId,
      //       identifier: syncData.identifier,
      //       amount: syncData.amount,
      //       description: `Reward sync`,
      //     });
      //   } else {
      //     throw new Error('Reward not sync or user not found on brand site');
      //   }
      // }

      // const discount = (offer.tokens * offer.discountPercentage) / 100;
      // const amount = offer.tokens - discount;

      const totalAmount = offer.tokens * quantity;

      // //check if the user has enough point to redeem
      // if (registry.balance < +totalAmount) {
      //   throw new Error('Insufficient point to redeem');
      // }

      // create deposit history
      await this.syncService.debitReward({
        rewardId: offer.rewardId,
        userId,
        amount: totalAmount,
        description: `Redeem offer ${offer.name}`,
      });

      const coupon = await this.couponService.create({
        user_id: user.id,
        offer_id: offerId,
        isUsed: false,
      });

      const orderRecord = new Order();
      orderRecord.userId = user.id;
      orderRecord.offerId = offerId;
      orderRecord.points = totalAmount;
      orderRecord.couponId = coupon.id;
      orderRecord.quantity = quantity;
      orderRecord.brandId = offer.brandId;

      const order = await this.orderService.saveOrder(orderRecord);

      // TODO: send notification to user

      // return {
      //   qrImage: `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${order.coupon.code}&choe=UTF-8`,
      //   couponCode: coupon.code,
      // };

      await this.markOrderAsRedeemed(userId, order.id);

      return {
        message: 'redeem',
      };
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrders(query: FilterOrderDto) {
    try {
      return this.orderService.getOrders(query);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrderById(userId: string, id: string) {
    try {
      return this.orderService.getOrderById(userId, id);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async markOrderAsRedeemed(userId: string, id: string) {
    try {
      const order = await this.orderService.getOrderById(userId, id);

      if (!order) {
        throw new HttpException('Redeem not found', HttpStatus.NOT_FOUND);
      }

      const coupon = await this.couponService.findOneById(order.couponId);
      coupon.isUsed = true;
      await this.couponService.saveCoupon(coupon);

      order.isRedeemed = true;

      return await this.orderService.saveOrder(order);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async useCoupon(body: UseCouponDto) {
    try {
      return this.couponService.useCoupon(body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async redeemWithRewardSpend({
    userId,
    offerId,
    quantity,
    rewardId,
  }: CreateOrderDto) {
    try {
      const offer = await this.offerService.getOfferById(offerId);

      if (!offer) {
        throw new Error('Offer not found');
      }

      if (quantity === 0) {
        throw new Error('Quantity must be greater than 0');
      }

      const brand = await this.brandService.getBrandWithOnlineCreds(
        offer.brandId,
      );

      if ((offer.product.inventory ?? 0) < quantity) {
        throw new Error('Offer is out of stock');
      }

      // Check that after removing the quantity, the inventory is still greater than 0
      if ((offer.product.inventory ?? 0) - quantity < 0) {
        throw new Error(
          `You cannot redeem more than ${offer.product.inventory} at the moment`,
        );
      }

      // check if offer has expired
      if (offer.endDate < new Date()) {
        throw new Error('Offer has expired');
      }

      if (!brand.online_store_type) {
        throw new Error(
          'You cannot redeem this offer at the moment. Try again later',
        );
      }

      if (!offer.product.productIdOnBrandSite) {
        throw new Error(
          "We couldn't determine the product id on brand site for this offer",
        );
      }

      // Validate online store setup
      await checkBrandOnlineStore({ brand });

      // TODO: uncomment this
      // const canPayCost = await this.fiatWalletService.checkCanPayCost(
      //   offer.brandId,
      // );

      // if (!canPayCost) {
      //   throw new Error('Brand cannot pay cost');
      // }
      // TODO: uncomment this

      const user = await this.userService.getUserById(userId);

      const discount = (offer.tokens * offer.discountPercentage) / 100;
      const amount = offer.tokens - discount;

      const totalAmount = amount * quantity;

      const orderRecord = new Order();
      orderRecord.userId = user.id;
      orderRecord.offerId = offerId;
      orderRecord.points = totalAmount;
      orderRecord.quantity = quantity;
      orderRecord.brandId = offer.brandId;
      orderRecord.redeemRewardId = rewardId;

      const order = await this.orderService.saveOrder(orderRecord);

      await this.offerService.reduceInventory(offer, order);

      return order;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async completeOrder({
    orderId,
    taskId,
    verifier,
    spendData,
  }: {
    orderId: string;
    taskId: string;
    verifier: OrderVerifier;
    spendData: SpendData;
  }) {
    try {
      const order = await this.orderService.getOrderByOrderId(orderId);

      if (!order) {
        throw new Error('Order not found');
      }

      if (order.status === StatusType.INCOMPLETE) {
        throw new Error('Order has been marked as incomplete');
      }

      order.spendData = spendData;
      order.taskId = taskId;
      order.verifier = verifier;

      const transaction = new Transaction();
      transaction.amount = order.points;
      transaction.transactionType = TransactionsType.DEBIT;
      transaction.paymentRef = generateTransactionCode();
      transaction.narration = `Redeem ${order.offer.name} from ${order.offer.brand.name}`;
      transaction.rewardId = order.redeemRewardId;
      transaction.orderId = order.id;
      transaction.paymentMethod = PaymentMethodEnum.REWARD;
      transaction.source = TransactionSource.OFFER_REDEMPTION;
      transaction.status = StatusType.PROCESSING;

      await this.transactionRepo.save(transaction);

      const offer = await this.offerService.getOfferById(order.offerId);

      await this.billerService.createBill({
        type: 'redeem-offer',
        amount: 1.5,
        brandId: offer.brandId,
      });

      return await this.orderService.saveOrder(order);
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Cron(CronExpression.EVERY_SECOND)
  async checkOrderStatus() {
    try {
      const pendingOrders = await this.orderService.getPendingOrders();

      if (pendingOrders.length > 0) {
        for (const order of pendingOrders) {
          const status = await this.checkOrderStatusGelatoOrRuntime(
            order.taskId,
            order.verifier,
          );

          const offer = await this.offerService.getOfferById(order.offerId);
          const customer = await this.customerService.getByUserId(order.userId);
          const transaction = await this.transactionRepo.findOne({
            where: {
              orderId: order.id,
            },
          });
          const brand = await this.brandService.getBrandWithOnlineCreds(
            order.brandId,
          );

          if (!brand?.online_store_type) {
            return;
          }

          if (status === 'success') {
            await this.offerService.increaseOfferSales({
              offer,
              amount: order.points,
              userId: order.userId,
            });

            const coupon = await this.couponService.create({
              user_id: order.userId,
              offer_id: order.offerId,
            });

            order.couponId = coupon.id;
            order.status = StatusType.SUCCEDDED;

            await this.orderService.saveOrder(order);

            // create online store coupon
            const onlineCoupon = await createCoupon({
              brand,
              data: {
                code: coupon.code,
                amount: order.points.toString(),
                minimum_amount: order.points.toString(),
              },
              productId: offer.productId,
            });

            if (transaction) {
              transaction.status = StatusType.SUCCEDDED;
              await this.transactionRepo.save(transaction);
            }

            const reward = await this.rewardService.findOneById(
              order.redeemRewardId,
            );

            const balance = await get_user_reward_balance_with_url(
              {
                address: customer.walletAddress,
                reward_address: reward.contractAddress,
              },
              RUNTIME_URL,
            );

            if (balance.data?.result) {
              const registry = await this.syncService.findOneRegistryByUserId(
                order.userId,
                reward.id,
              );
              if (registry) {
                registry.hasBalance =
                  balance?.data?.result === '0x0' ? false : true;

                await this.syncService.saveRegistry(registry);
              }
            }

            //  Send notification to user

            const notification = new Notification();
            notification.userId = order.userId;
            notification.message = `Congratulations! You have successfully redeemed ${offer.name} from ${offer.brand.name}`;
            notification.type = NotificationType.ORDER;
            notification.title = 'Order Redeemed';
            notification.orderId = order.id;
            notification.icon = offer.brand.logo;
            notification.image = offer.offerImages?.[0].url;
            notification.emailMessage = /* html */ `
              <div>
                <p>Hello ${customer?.name},</p>
                <p>Congratulations! You have successfully redeemed ${
                  offer.name
                } from ${offer.brand.name}</p> 
                <p>Offer Details</p>
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <img src="${
                    offer.offerImages?.[0].url
                  }" alt="offer image" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 10px;" />
                  <p style="font-size: 20px; font-weight: bold;">${
                    offer.name
                  }</p>
                  <p style="font-size: 16px; font-weight: bold;">${
                    offer.brand.name
                  }</p>
                </div>
                <p>Redemption Details</p>
                <p>Coupon Code: ${coupon.code}</p>
                <p>Points: ${order.points}</p>
                <p>Quantity: ${order.quantity}</p>
                ${emailButton({
                  text: 'Redeem now',
                  url: `${offer.product.productUrl}?coupon=${coupon.code}`,
                })}
             `;

            // await this.notificationService.createNotification(notification);

            //   balance: registry.balance,
            //   description,
            //   transactionType: TransactionsType.CREDIT,
            //   rewardRegistryId: registry.id,
            //   amount: amount,

            // create history

            const registry =
              await this.syncService.findOneRegistryByEmailIdentifier(
                order.user.email,
                reward.id,
              );

            const history = new RegistryHistory();
            history.rewardRegistryId = registry.id;
            history.amount = order.points;
            history.description = `Redeem ${offer.name} from ${offer.brand.name}`;
            history.transactionType = TransactionsType.DEBIT;
            history.balance =
              balance?.data?.result === '0x0'
                ? 0
                : Number(ethers.utils.formatEther(balance.data.result) ?? 0);

            await this.syncService.saveRegistryHistory(history);

            reward.totalRedeemedSupply =
              Number(reward?.totalRedeemedSupply ?? 0) + Number(order.points);
            await this.rewardService.save(reward);

            // Update circulating supply
            const circulatingSupply = new RewardCirculation();
            circulatingSupply.brandId = reward.brandId;
            circulatingSupply.rewardId = reward.id;
            circulatingSupply.circulatingSupply =
              +reward.totalDistributedSupply - +reward.totalRedeemedSupply;
            circulatingSupply.totalRedeemedAtCirculation =
              reward.totalRedeemedSupply;
            circulatingSupply.totalDistributedSupplyAtCirculation =
              reward.totalDistributedSupply;

            await this.analyticsRecorder.createRewardCirculation(
              circulatingSupply,
            );

            // update customer total redeem

            const isExternalOffer = offer.rewardId !== order.redeemRewardId;

            if (isExternalOffer) {
              const totalCustomerExternalRedeemed =
                Number(customer?.totalExternalRedeemed ?? 0) + 1;

              customer.totalExternalRedeemed = Number(
                totalCustomerExternalRedeemed.toFixed(0),
              );
              customer.totalExternalRedemptionAmount =
                Number(customer?.totalExternalRedemptionAmount ?? 0) +
                Number(order.points);
            } else {
              const totalCustomerRedeemed =
                Number(customer?.totalRedeemed ?? 0) + 1;

              customer.totalRedeemed = Number(totalCustomerRedeemed.toFixed(0));

              customer.totalRedemptionAmount =
                Number(customer?.totalRedemptionAmount ?? 0) +
                Number(order.points);
            }

            await this.customerService.save(customer);

            const brandCustomer = await this.brandService.getBrandCustomer(
              reward.brandId,
              customer.userId,
            );

            if (isExternalOffer) {
              const totalBrandCustomerExternalRedeemed =
                Number(brandCustomer?.totalExternalRedeemed ?? 0) + 1;

              brandCustomer.totalExternalRedeemed = Number(
                totalBrandCustomerExternalRedeemed.toFixed(0),
              );
              brandCustomer.totalExternalRedemptionAmount =
                Number(brandCustomer?.totalExternalRedemptionAmount ?? 0) +
                Number(order.points);
            } else {
              const totalBrandCustomerRedeemed =
                Number(brandCustomer?.totalRedeemed ?? 0) + 1;

              brandCustomer.totalRedeemed = Number(
                totalBrandCustomerRedeemed.toFixed(0),
              );
              brandCustomer.totalRedemptionAmount =
                Number(brandCustomer?.totalRedemptionAmount ?? 0) +
                Number(order.points);
            }

            await this.brandService.saveBrandCustomer(brandCustomer);
          } else if (status === 'failed') {
            console.log('Order failed');

            await redistributed_failed_tx_with_url(
              order.spendData,
              RUNTIME_URL,
            );

            order.status = StatusType.FAILED;
            await this.orderService.saveOrder(order);
            await this.offerService.increaseInventory(offer, order);

            if (transaction) {
              transaction.status = StatusType.FAILED;
              await this.transactionRepo.save(transaction);
            }

            //  Send notification to user

            const notification = new Notification();
            notification.userId = order.userId;
            notification.message = `Sorry! Your order for ${offer.name} from ${offer.brand.name} has failed and a refund has been initiated. Please try again`;
            notification.type = NotificationType.ORDER;
            notification.title = 'Order Failed';
            notification.orderId = order.id;
            notification.icon = offer.brand.logo;
            notification.image = offer.offerImages?.[0].url;
            notification.emailMessage = /* html */ `
              <div>
                <p>Hello ${customer?.name},</p>
                <p>Sorry! Your order for ${offer.name} from ${offer.brand.name} has failed</p>
                <p>Offer Details</p>
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <img src="${offer.offerImages?.[0].url}" alt="offer image" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 10px;" />
                  <p style="font-size: 20px; font-weight: bold;">${offer.name}</p>
                  <p style="font-size: 16px; font-weight: bold;">${offer.brand.name}</p>
                </div>
                <p>Redemption Details</p>
                <p>Points: ${order.points}</p>
                <p>Quantity: ${order.quantity}</p>
              `;

            await this.notificationService.createNotification(notification);
          } else {
            if (order.retries > 4) {
              order.status = StatusType.INCOMPLETE;

              await this.orderService.saveOrder(order);
            }

            order.status = StatusType.PROCESSING;
            order.retries = order.retries + 1;
            await this.orderService.saveOrder(order);
          }
        }
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }

  async checkOrderStatusGelatoOrRuntime(
    taskId: string,
    verifier: OrderVerifier,
  ): Promise<'success' | 'failed' | 'pending'> {
    try {
      if (verifier === OrderVerifier.GELATO) {
        const status =
          await this.costModuleService.checkTransactionStatusWithRetry({
            taskId,
          });

        if (status === 'ExecSuccess') {
          return 'success';
        } else if (status === 'ExecFailed') {
          return 'failed';
        } else {
          return 'pending';
        }
      } else {
        const runtimeStatus = await get_transaction_by_hash_with_url(
          {
            hash: taskId,
          },
          RUNTIME_URL,
        );

        if (
          runtimeStatus.data.result.hash !==
          '0x0000000000000000000000000000000000000000000000000000000000000000'
        ) {
          return 'success';
        } else {
          return 'failed';
        }
      }
    } catch (error) {
      return 'pending';
    }
  }
}
