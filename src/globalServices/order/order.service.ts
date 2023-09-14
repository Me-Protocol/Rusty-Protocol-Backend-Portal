import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CouponService } from './coupon.service';
import { OrderFilter } from '@src/utils/enums/OrderFilter';
import { StatusType } from '@src/utils/enums/Transactions';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    private readonly couponService: CouponService,
  ) {}

  randomCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async saveOrder(order: Order) {
    const orderRecord = await this.orderRepo.save(order);

    return await this.orderRepo.findOne({
      where: { id: orderRecord.id },
      relations: ['coupon'],
    });
  }

  async getOrders({
    limit = 10,
    page,
    filterBy,
    userId,
    brandId,
  }: {
    userId: string;
    page: number;
    limit: number;
    filterBy: OrderFilter;
    brandId: string;
  }) {
    const orderQuery = this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.coupon', 'coupon')
      .leftJoinAndSelect('order.offer', 'offer')
      .leftJoinAndSelect('offer.offerImages', 'offerImages')
      .leftJoinAndSelect('offer.reward', 'reward')
      .leftJoinAndSelect('reward.brand', 'brand')
      .leftJoinAndSelect('offer.product', 'product')
      .leftJoinAndSelect('product.productImages', 'productImages')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.collections', 'collections')
      .orderBy('order.createdAt', 'DESC');

    if (brandId) {
      orderQuery.where('order.offer.brandId = :brandId', { brandId: brandId });
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

    const orders = await orderQuery
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    const total = await this.orderRepo.count();

    return {
      orders,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async getOrderById(userId: string, id: string) {
    return await this.orderRepo.findOne({
      where: { id: id, userId: userId },
      relations: ['coupon', 'offer', 'offer.reward', 'offer.offerImages'],
    });
  }

  async getOrderByOrderId(orderId: string) {
    return await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['coupon', 'offer', 'offer.reward', 'offer.offerImages'],
    });
  }

  async getPendingOrders() {
    return await this.orderRepo.find({
      where: {
        status: StatusType.PROCESSING,
        taskId: Not(IsNull()),
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
}
