import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CouponService } from './coupon.service';
import { OrderFilter } from '@src/utils/enums/OrderFilter';
import { StatusType } from '@src/utils/enums/Transactions';
import { FilterOrderDto } from '@src/modules/storeManagement/order/dto/FilterOrderDto.dto';
import { OfferService } from '../offer/offer.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    private readonly couponService: CouponService,
    private readonly offerService: OfferService,
  ) {}

  randomCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async saveOrder(order: Order) {
    const orderRecord = await this.orderRepo.save(order);

    return await this.orderRepo.findOne({
      where: { id: orderRecord.id },
      relations: ['coupon', 'offer', 'reward'],
    });
  }

  async getOrders(query: FilterOrderDto) {
    const {
      limit,
      page,
      filterBy,
      userId,
      brandId,
      productId,
      startDate,
      endDate,
      offerId,
    } = query;

    const orderQuery = this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.coupon', 'coupon')
      .leftJoinAndSelect('order.offer', 'offer')
      .leftJoinAndSelect('offer.offerImages', 'offerImages')
      .leftJoinAndSelect('offer.reward', 'reward')
      .leftJoinAndSelect('reward.brand', 'brand')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('user.customer', 'customer')
      .orderBy('order.createdAt', 'DESC')
      .select([
        'order',
        'coupon',
        'offer',
        'offerImages',
        'reward',
        'brand',
        'customer',
      ]);

    if (brandId) {
      orderQuery
        .leftJoinAndSelect('offer.product', 'product')
        .leftJoinAndSelect('product.productImages', 'productImages')
        .leftJoinAndSelect('product.variants', 'variants')
        .leftJoinAndSelect('product.collections', 'collections')
        .andWhere('order.brandId = :brandId', {
          brandId: brandId,
        });

      if (productId) {
        orderQuery.andWhere('product.id = :productId', {
          productId: productId,
        });
      }
    }

    if (offerId) {
      orderQuery.andWhere('order.offerId = :offerId', {
        offerId: offerId,
      });
    }

    if (userId) {
      orderQuery.andWhere('order.userId = :userId', { userId: userId });
    }

    if (filterBy === OrderFilter.REDEEMED) {
      orderQuery.andWhere('order.isRedeemed = :isRedeemed', {
        isRedeemed: true,
      });
    }

    if (filterBy === OrderFilter.UNREDEEMED) {
      orderQuery.andWhere('order.isRedeemed = :isRedeemed', {
        isRedeemed: false,
      });
    }

    if (filterBy === OrderFilter.PROCESSING) {
      orderQuery.andWhere('order.status = :status', {
        status: StatusType.PROCESSING,
      });
    }

    if (filterBy === OrderFilter.SUCCEDDED) {
      orderQuery.andWhere('order.status = :status', {
        status: StatusType.SUCCEDDED,
      });
    }

    if (filterBy === OrderFilter.FAILED) {
      orderQuery.andWhere('order.status = :status', {
        status: StatusType.FAILED,
      });
    }

    if (startDate && endDate) {
      orderQuery.andWhere('order.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const [orders, total] = await orderQuery
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    let percentageRedemption;
    let totalRedeemedAmount;
    const ordersPerDay = {};

    if (offerId) {
      // percentage redemption based on offer inventory
      const offer = await this.offerService.getOfferById(offerId);
      const redeemed = await this.orderRepo.count({
        where: {
          offerId: offerId,
          status: StatusType.SUCCEDDED,
        },
      });

      percentageRedemption = (redeemed / offer.inventory) * 100;

      // total redeemed amount
      const redeemedAmount = await this.orderRepo.find({
        where: {
          offerId: offerId,
          isRedeemed: true,
          status: StatusType.SUCCEDDED,
        },
      });

      totalRedeemedAmount = redeemedAmount.reduce((acc, curr) => {
        return acc + Number(curr.points);
      }, 0);

      orders.forEach((follower) => {
        const date = follower.createdAt.toISOString().split('T')[0];
        if (ordersPerDay[date]) {
          ordersPerDay[date] += 1;
        } else {
          ordersPerDay[date] = 1;
        }
      });
    }

    return {
      orders,
      total,
      ordersPerDay,
      percentageRedemption,
      totalRedeemedAmount,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async getOrderById(userId: string, id: string) {
    return await this.orderRepo.findOne({
      where: { id: id, userId: userId },
      relations: [
        'coupon',
        'offer',
        'offer.reward',
        'offer.offerImages',
        'offer.product',
      ],
    });
  }

  async getOrderByOrderId(orderId: string) {
    return await this.orderRepo.findOne({
      where: { id: orderId },
      relations: [
        'coupon',
        'reward',
        'offer',
        'offer.offerImages',
        'offer.brand',
      ],
    });
  }

  async getPendingOrders() {
    return await this.orderRepo.find({
      where: {
        status: StatusType.PROCESSING,
        taskId: Not(IsNull()),
      },
      relations: ['coupon', 'user', 'brand'],
    });
  }

  async getOrderWithoutTaskId() {
    return await this.orderRepo.find({
      where: {
        status: StatusType.PROCESSING,
        taskId: IsNull(),
      },
      relations: ['coupon'],
    });
  }

  async markOrderAsRedeemed(userId: string, id: string) {
    const order = await this.orderRepo.findOne({
      where: { id: id, userId: userId },
      relations: ['coupon'],
    });

    if (!order) {
      throw new HttpException('Redeem not found', HttpStatus.NOT_FOUND);
    }

    const coupon = await this.couponService.findOneById(order.couponId);
    coupon.isUsed = true;
    await this.couponService.saveCoupon(coupon);

    order.isRedeemed = true;

    return await this.orderRepo.save(order);
  }

  async getOrdersByOfferRewardId(offerRewardId: string, userId: string) {
    return await this.orderRepo.findOne({
      where: {
        offer: {
          rewardId: offerRewardId,
        },
        userId: userId,
      },
      relations: ['coupon'],
    });
  }
}
