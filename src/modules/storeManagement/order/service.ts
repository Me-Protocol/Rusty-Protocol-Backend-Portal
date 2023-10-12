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
import { StatusType, TransactionsType } from '@src/utils/enums/Transactions';
import { Notification } from '@src/globalServices/notification/entities/notification.entity';
import { NotificationType } from '@src/utils/enums/notification.enum';
import { emailButton } from '@src/utils/helpers/email';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { RegistryHistory } from '@src/globalServices/reward/entities/registryHistory.entity';

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

      // update customer total redeem
      const customer = await this.customerService.getByUserId(userId);
      customer.totalRedeemed += 1;
      customer.totalRedemptionAmount += totalAmount;

      await this.customerService.save(customer);

      await this.markOrderAsRedeemed(userId, order.id);

      return {
        message: 'redeem',
      };
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrders({ userId, page, limit, filterBy, brandId }: FilterOrderDto) {
    try {
      return this.orderService.getOrders({
        userId,
        page,
        limit,
        filterBy,
        brandId,
      });
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

  async redeemWithRewardSpend({ userId, offerId, quantity }: CreateOrderDto) {
    try {
      const offer = await this.offerService.getOfferById(offerId);

      if (!offer) {
        throw new Error('Offer not found');
      }

      if (quantity === 0) {
        throw new Error('Quantity must be greater than 0');
      }

      if (offer.product.inventory < quantity) {
        throw new Error('Offer is out of stock');
      }

      // Check that after removing the quantity, the inventory is still greater than 0
      if (offer.product.inventory - quantity < 0) {
        throw new Error(
          `You cannot redeem more than ${offer.product.inventory} at the moment`,
        );
      }

      // check if offer has expired
      if (offer.endDate < new Date()) {
        throw new Error('Offer has expired');
      }

      const canPayCost = await this.fiatWalletService.checkCanPayCost(
        offer.brandId,
      );

      if (!canPayCost) {
        throw new Error('Brand cannot pay cost');
      }
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

      const order = await this.orderService.saveOrder(orderRecord);

      await this.offerService.reduceInventory(offer, order);

      return order;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async completeOrder(orderId: string, taskId: string) {
    const order = await this.orderService.getOrderByOrderId(orderId);

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    order.taskId = taskId;

    return await this.orderService.saveOrder(order);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkOrderStatus() {
    const pendingOrders = await this.orderService.getPendingOrders();

    if (pendingOrders.length > 0) {
      for (const order of pendingOrders) {
        const status =
          await this.costModuleService.checkTransactionStatusWithRetry({
            taskId: order.taskId,
          });

        const offer = await this.offerService.getOfferById(order.offerId);
        const customer = await this.customerService.getByUserId(order.userId);

        if (status === 'ExecSuccess') {
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

          await this.notificationService.createNotification(notification);

          //   balance: registry.balance,
          //   description,
          //   transactionType: TransactionsType.CREDIT,
          //   rewardRegistryId: registry.id,
          //   amount: amount,

          // create history

          const registry = await this.syncService.findOneRegistryByUserId(
            order.userId,
            offer.rewardId,
          );

          const history = new RegistryHistory();
          history.rewardRegistryId = registry.id;
          history.amount = order.points;
          history.description = `Redeem ${offer.name} from ${offer.brand.name}`;
          history.transactionType = TransactionsType.DEBIT;
          history.balance = 0;

          await this.syncService.saveRegistryHistory(history);
        } else if (status === 'ExecFailed') {
          order.status = StatusType.FAILED;

          await this.orderService.saveOrder(order);

          await this.offerService.increaseInventory(offer, order);

          //  Send notification to user

          const notification = new Notification();
          notification.userId = order.userId;
          notification.message = `Sorry! Your order for ${offer.name} from ${offer.brand.name} has failed`;
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
        }
      }
    }
  }
}
