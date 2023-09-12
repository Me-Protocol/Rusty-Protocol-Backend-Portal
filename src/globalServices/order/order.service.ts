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

  async getOrders(
    userId: string,
    page: number,
    limit = 10,
    filterBy: OrderFilter,
  ) {
    const orderQuery = this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.coupon', 'coupon')
      .leftJoinAndSelect('order.offer', 'offer')
      .leftJoinAndSelect('offer.reward', 'reward')
      .leftJoinAndSelect('reward.brand', 'brand');

    if (filterBy === OrderFilter.REDEEMED) {
      orderQuery.andWhere('order.isRedeemed = :isRedeemed', {
        isRedeemed: true,
      });
    } else if (filterBy === OrderFilter.UNREDEEMED) {
      orderQuery.andWhere('order.isRedeemed = :isRedeemed', {
        isRedeemed: false,
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
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  async getOrderById(userId: string, id: string) {
    return await this.orderRepo.findOne({
      where: { id: id, userId: userId },
      relations: ['coupon'],
    });
  }

  async getOrderByOrderId(orderId: string) {
    return await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['coupon'],
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
