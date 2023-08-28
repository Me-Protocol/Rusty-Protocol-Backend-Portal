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
import { RewardService } from '@src/globalServices/reward/reward.service';
import { RewardRegistry } from '@src/globalServices/reward/entities/registry.entity';
import { RewardManagementService } from '../reward/service';

@Injectable()
export class OrderManagementService {
  constructor(
    private readonly syncService: SyncRewardService,
    private readonly couponService: CouponService,
    private readonly offerService: OfferService,
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    private readonly rewardService: RewardService,
    private readonly rewardManagementService: RewardManagementService,
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

      let registry = await this.syncService.findOneRegistryByUserId(
        userId,
        offer.rewardId,
      );

      if (!registry) {
        const syncData = await this.rewardService.getRegistryByIdentifer(
          user.email,
          offer.rewardId,
        );

        if (syncData) {
          //  create registry
          const registryRecord = new RewardRegistry();
          registryRecord.rewardId = offer.rewardId;
          registryRecord.customerIdentiyOnBrandSite = syncData.identifier;
          registryRecord.customerIdentityType = syncData.identifierType;
          registryRecord.balance = 0;
          registryRecord.userId = user.id;

          registry = await this.syncService.addRegistry(registryRecord);

          // create transaction
          await this.syncService.creditReward({
            rewardId: offer.rewardId,
            identifier: syncData.identifier,
            amount: syncData.amount,
            description: `Reward sync`,
          });
        } else {
          throw new Error('Reward not sync or user not found on brand site');
        }
      }

      const discount = (offer.tokens * offer.discountPercentage) / 100;
      const amount = offer.tokens - discount;

      const totalAmount = amount * quantity;

      //check if the user has enough point to redeem
      if (registry.balance < +totalAmount) {
        throw new Error('Insufficient point to redeem');
      }

      //create deposit history
      await this.syncService.debitReward({
        rewardId: offer.rewardId,
        userId,
        amount: totalAmount,
        description: `Redeem offer ${offer.name}`,
      });

      const coupon = await this.couponService.create(user.id, offerId);

      const orderRecord = new Order();
      orderRecord.userId = user.id;
      orderRecord.offerId = offerId;
      orderRecord.points = totalAmount;
      orderRecord.couponId = coupon.id;
      orderRecord.quantity = quantity;

      const order = await this.orderService.saveOrder(orderRecord);

      // TODO: send notification to user

      return {
        qrImage: `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${order.coupon.code}&choe=UTF-8`,
        couponCode: coupon.code,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrders({ userId, page, limit }: FilterOrderDto) {
    try {
      return this.orderService.getOrders(userId, page, limit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrderById(userId: string, id: string) {
    try {
      return this.orderService.getOrderById(userId, id);
    } catch (error) {
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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async useCoupon(body: UseCouponDto) {
    try {
      return this.couponService.useCoupon(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async redeemWithRewardSpend({
    userId,
    offerId,
    quantity,
    params,
  }: CreateOrderDto) {
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

      // check if offer has expired
      if (offer.endDate < new Date()) {
        throw new Error('Offer has expired');
      }
      const user = await this.userService.getUserById(userId);

      const discount = (offer.tokens * offer.discountPercentage) / 100;
      const amount = offer.tokens - discount;

      const totalAmount = amount * quantity;

      // Spend reward
      const spend = await this.rewardManagementService.spendReward({
        rewardId: offer.rewardId,
        params,
      });

      const coupon = await this.couponService.create(user.id, offerId);

      const orderRecord = new Order();
      orderRecord.userId = user.id;
      orderRecord.offerId = offerId;
      orderRecord.points = totalAmount;
      orderRecord.couponId = coupon.id;
      orderRecord.quantity = quantity;
      orderRecord.isRedeemed = true;

      await this.orderService.saveOrder(orderRecord);

      await this.offerService.increaseOfferSales({
        offer,
        amount: totalAmount,
      });

      // TODO: send notification to user

      return spend;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
