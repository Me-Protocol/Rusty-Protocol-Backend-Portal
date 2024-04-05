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
import { RewardCirculation } from '@src/globalServices/analytics/entities/reward_circulation.entity';
import { AnalyticsRecorderService } from '@src/globalServices/analytics/analytic_recorder.service';
import { Transaction } from '@src/globalServices/fiatWallet/entities/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generateTransactionCode } from '@src/utils/helpers/generateRandomCode';
import { PaymentMethodEnum } from '@src/utils/enums/PaymentMethodEnum';
import { SpendData } from '@src/utils/types/spendData';
import {
  get_user_reward_balance_with_url,
  redistributed_failed_tx_with_url,
} from '@developeruche/runtime-sdk';
import { RUNTIME_URL } from '@src/config/env.config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BillerService } from '@src/globalServices/biller/biller.service';
import { ethers } from 'ethers';
import { createCoupon } from '@src/globalServices/online-store-handler/create-coupon';
import { checkBrandOnlineStore } from '@src/globalServices/online-store-handler/check-store';
import { BillType } from '@src/utils/enums/BillType';
import { checkOrderStatusGelatoOrRuntime } from '@src/globalServices/costManagement/taskId-verifier.service';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { Customer } from '@src/globalServices/customer/entities/customer.entity';
import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import { checkProductOnBrandStore } from '@src/globalServices/online-store-handler/check-product';
import { BullService } from '@src/globalServices/task-queue/bull.service';
import {
  ORDER_PROCESSOR_QUEUE,
  ORDER_TASK_QUEUE,
} from '@src/utils/helpers/queue-names';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { deleteCouponCode } from '@src/globalServices/online-store-handler/delete-coupon';
import { ShopifyHandler } from '@src/globalServices/online-store-handler/shopify';
import { AxiosInstance } from 'axios';

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

    // private readonly bullService: BullService,

    @InjectQueue(ORDER_TASK_QUEUE)
    private readonly orderQueue: Queue,
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

      const couponCode = await this.couponService.generateCouponCode();

      const coupon = await this.couponService.create({
        user_id: user.id,
        offer_id: offerId,
        isUsed: false,
        couponCode,
        orderCode: '',
        brandDiscountId: '',
        brandPriceRuleId: '',
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

  async getShopifyToken({ brandId }: { brandId: string }) {
    try {
      const brand = await this.brandService.getBrandById(brandId);
    
      const shopifyHandler = new ShopifyHandler();
      const shopify: AxiosInstance = shopifyHandler.createInstance(brand);
      
      const {data} = await shopify.post('/storefront_access_tokens.json', {
        storefront_access_token: {
          title: `token_${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}`
        }
      })
      
      return data?.storefront_access_token?.access_token

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
    amount,
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

      if ((offer.inventory ?? 0) < quantity) {
        throw new Error('Offer is out of stock');
      }

      // Check that after removing the quantity, the inventory is still greater than 0
      if ((offer.inventory ?? 0) - quantity < 0) {
        throw new Error(
          `You cannot redeem more than ${offer.inventory} at the moment`,
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
      try {
        await checkBrandOnlineStore({ brand });
      } catch (error) {
        throw new Error('Error validing brand store.');
      }

      try {
        await checkProductOnBrandStore({
          brand,
          productId: offer.product.productIdOnBrandSite,
        });
      } catch (error) {
        throw new Error('Error validating product on brand site.');
      }

      const user = await this.userService.getUserById(userId);

      const orderRecord = new Order();
      orderRecord.userId = user.id;
      orderRecord.offerId = offerId;
      orderRecord.points = amount;
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

  async createCoupon(orderId: string) {
    try {
      const order = await this.orderService.getOrderByOrderId(orderId);
      const couponCode = await this.couponService.generateCouponCode();
      const offer = await this.offerService.getOfferById(order.offerId);
      const brand = await this.brandService.getBrandWithOnlineCreds(
        order.brandId,
      );

      try {
        const coupon = await createCoupon({
          brand,
          data: {
            code: couponCode,
            amount: offer.discountPercentage,
          },
          productId: offer.product.id,
          productIdOnBrandSite: offer.product.productIdOnBrandSite,
          email: order.user.email,
        });

        await this.couponService.create({
          user_id: order.userId,
          offer_id: order.offerId,
          couponCode,
          orderCode: order.orderCode,
          brandDiscountId: coupon.discount_code_id,
          brandPriceRuleId: coupon.price_rule_id,
        });
      } catch (error) {
        throw new Error(
          error?.message ?? 'Error creating coupon code on brand website',
        );
      }
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

      const coupon = await this.couponService.couponByOrderCode(
        order.orderCode,
      );

      if (!coupon) {
        throw new Error('Order does not have a coupon.');
      }

      order.spendData = spendData;
      order.taskId = taskId;
      order.verifier = verifier;

      await this.orderService.saveOrder(order);

      if (
        taskId ===
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      ) {
        const transaction = await this.transactionRepo.findOne({
          where: {
            orderId: order.id,
          },
        });

        const offer = await this.offerService.getOfferById(order.offerId);
        const customer = await this.customerService.getByUserId(order.userId);

        await this.failOrderAndRefund({
          order,
          transaction,
          offer,
          customer,
          failReason: 'Request failed. Try again.',
          status: StatusType.FAILED,
        });

        throw new Error('Request failed. Try again.');
      }

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
        type: BillType.REDEEM_OFFER,
        amount: 1.5,
        brandId: offer.brandId,
      });

      const job = await this.orderQueue.add(
        ORDER_PROCESSOR_QUEUE,
        { orderId },
        {
          attempts: 6, // Number of retry attempts
          backoff: {
            type: 'exponential', // Exponential backoff
            delay: 30000, // Initial delay before first retry in milliseconds
          },
          removeOnComplete: 1000,
        },
      );
      order.jobId = job.id.toString();

      const saveOrder = await this.orderService.saveOrder(order);

      return saveOrder;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkOrderStatus(orderId: string) {
    try {
      const order = await this.orderService.getOrderByOrderId(orderId);

      if (order.status !== StatusType.PROCESSING) {
        return;
      }

      const status = await checkOrderStatusGelatoOrRuntime(
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

      const isSetupWoocommerce =
        brand?.online_store_type === OnlineStoreType.WOOCOMMERCE &&
        brand.woocommerce_online_store_url &&
        brand.woocommerce_consumer_key &&
        brand.woocommerce_consumer_secret;

      const isSetupShopify =
        brand?.online_store_type === OnlineStoreType.SHOPIFY &&
        brand.shopify_online_store_url &&
        brand.shopify_consumer_secret;

      if (isSetupWoocommerce || isSetupShopify) {
        if (status === 'success') {
          const coupon = await this.couponService.couponByOrderCode(
            order.orderCode,
          );

          if (!coupon) {
            console.log('Coupon code not found');
            return;
          }

          order.couponId = coupon.id;
          order.status = StatusType.SUCCEDDED;

          await this.orderService.saveOrder(order);

          // create online store coupon
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
                  }" alt="offer image" style="width: 100px; height: 100px; object-fit: cover; border-radius: 16px; margin-bottom: 10px; margin-right: 10px;" />
                  <div>
                    <p style="font-size: 20px; font-weight: bold;">${
                      offer.name
                    }</p>
                    <p style="font-size: 16px; font-weight: bold;">${
                      offer.brand.name
                    }</p>
                  </div>
                </div>
                <p>Redemption Details</p>
                <p>Coupon Code: <b>${coupon.code}</b></p>
                <p>Points: <b>${order.points}</b></p>
                <p>Quantity: <b>${order.quantity}</b></p>
                ${emailButton({
                  text: 'Redeem now',
                  url: `${offer.product.productUrl}?coupon=${coupon.code}`,
                })}
             `;

          await this.notificationService.createNotification(notification);

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
            Number(reward.totalDistributed ?? 0) -
            Number(reward.totalRedeemedSupply);
          circulatingSupply.totalRedeemedAtCirculation =
            reward.totalRedeemedSupply;
          circulatingSupply.totalDistributedSupplyAtCirculation =
            reward.totalDistributed;

          await this.analyticsRecorder.createRewardCirculation(
            circulatingSupply,
          );

          const brandCustomer = await this.brandService.getBrandCustomer(
            reward.brandId,
            order.userId,
          );

          // update customer total redeem
          const isExternalOffer = offer.rewardId !== order.redeemRewardId;

          if (isExternalOffer) {
            const externalRedemptions =
              await this.orderService.getCustomerExternalRedemptions({
                userId: order.userId,
                rewardId: reward.id,
              });

            customer.totalExternalRedeemed =
              Number(customer.totalExternalRedeemed) + 1;
            customer.totalExternalRedemptionAmount =
              Number(customer.totalExternalRedemptionAmount) +
              Number(order.points);

            brandCustomer.totalExternalRedeemed = externalRedemptions.length;
            brandCustomer.totalExternalRedemptionAmount =
              externalRedemptions.reduce(
                (acc, curr) => acc + Number(curr.points),
                0,
              );
          } else {
            const internalRedemptions =
              await this.orderService.getCustomerInternalRedemptions({
                userId: order.userId,
                rewardId: reward.id,
              });

            brandCustomer.totalRedeemed = internalRedemptions.length;
            brandCustomer.totalRedemptionAmount = internalRedemptions.reduce(
              (acc, curr) => acc + Number(curr.points),
              0,
            );
          }

          await this.customerService.save(customer);
          await this.brandService.saveBrandCustomer(brandCustomer);

          console.log(brandCustomer);

          await this.offerService.increaseOfferSales({
            offer,
            userId: order.userId,
          });

          console.log('Done');
        } else if (status === 'failed') {
          await this.failOrderAndRefund({
            order,
            transaction,
            offer,
            customer,
            failReason: `${order.verifier} verifier failed`,
            status: StatusType.FAILED,
          });
        } else {
          if (order.retries >= 5) {
            order.failedReason = 'No response after retries';
            order.status = StatusType.INCOMPLETE;

            await this.orderService.saveOrder(order);
          } else {
            order.status = StatusType.PROCESSING;
            order.retries = order.retries + 1;
            await this.orderService.saveOrder(order);
          }

          throw new Error('Order is still processing');
        }
      } else {
        await this.failOrderAndRefund({
          order,
          transaction,
          offer,
          customer,
          failReason: 'Brand store not setup',
          status: StatusType.FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      logger.error(error);

      throw new Error('Order is still processing');
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async markOrderAsIncomplete() {
    const pendingOrders = await this.orderService.getOrderWithoutTaskId();

    if (pendingOrders.length > 0) {
      for (const order of pendingOrders) {
        if (order.retries > 30) {
          order.failedReason = 'No task id after retries';
          order.status = StatusType.INCOMPLETE;
          await this.orderService.saveOrder(order);
        } else {
          order.status = StatusType.PROCESSING;
          order.retries = order.retries + 1;
          await this.orderService.saveOrder(order);
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async retryPendingOrders() {
    const pendingOrders = await this.orderService.getPendingOrders();

    for (const order of pendingOrders) {
      const job = await this.orderQueue.getJob(order.jobId);
      if (job) {
        const isActive = await job.isActive();
        console.log('JOB', isActive);

        if (!isActive) {
          const status = await checkOrderStatusGelatoOrRuntime(
            order.taskId,
            order.verifier,
          );

          if (status === 'success') {
            await this.completeOrder({
              orderId: order.id,
              taskId: order.taskId,
              verifier: order.verifier,
              spendData: order.spendData,
            });
          } else if (status === 'failed') {
            order.status = StatusType.FAILED;
            order.failedReason = `${order.verifier} task verifier failed`;
            await this.orderService.saveOrder(order);

            await redistributed_failed_tx_with_url(
              order.spendData,
              RUNTIME_URL,
            );

            order.isRefunded = true;
            await this.orderService.saveOrder(order);
          } else {
            console.log('Pending');
            return;
          }
        }
      }
    }
  }

  async failOrderAndRefund({
    order,
    transaction,
    offer,
    customer,
    failReason,
    status,
  }: {
    order: Order;
    transaction: Transaction;
    offer: Offer;
    customer: Customer;
    failReason: string;
    status: StatusType;
  }) {
    order.status = status;
    order.failedReason = failReason;
    await this.orderService.saveOrder(order);

    const coupon = await this.couponService.couponByOrderCode(order.orderCode);
    const brand = await this.brandService.getBrandWithOnlineCreds(
      order.brandId,
    );

    if (!order.isRefunded) {
      const spendData = order.spendData as any;
      if (spendData) {
        const refund = await redistributed_failed_tx_with_url(
          spendData?.data,
          RUNTIME_URL,
        );

        console.log(refund.data);

        order.isRefunded = true;
        await this.orderService.saveOrder(order);
      }
    }

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
                <p><b>Reason</b>: ${failReason}</p>
                <p>Offer Details</p>
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <img src="${offer.offerImages?.[0].url}" alt="offer image" style="width: 100px; height: 100px; object-fit: cover; border-radius: 16px; margin-right: 10px;" />
                  <div>
                    <p style="font-size: 20px; font-weight: bold;">${offer.name}</p>
                    <p style="font-size: 14px;">${offer.brand.name}</p>
                  </div>
                </div>
                <p>Redemption Details</p>
                <p>Points: ${order.points}</p>
                <p>Quantity: ${order.quantity}</p>
              `;

    try {
      await this.notificationService.createNotification(notification);
    } catch (error) {
      console.log('Error sending email');
    }

    console.log(coupon);

    if (coupon.brandDiscountId) {
      try {
        await deleteCouponCode({
          brand,
          couponId: coupon.brandDiscountId,
          priceRuleId: coupon.brandPriceRuleId,
        });
      } catch (error) {
        console.log('Error deleting coupon', error);
      }
    }
  }
}
