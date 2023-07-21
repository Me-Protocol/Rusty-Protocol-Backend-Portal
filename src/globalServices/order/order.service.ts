import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CouponService } from './coupon.service';
import { pagination } from '@src/utils/types/pagination';

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

  async getOrders(userId: string, page: number, limit = 10) {
    const orders = await this.orderRepo.find({
      where: { userId: userId },
      skip: +page === 1 ? 0 : (+page - 1) * limit,
      take: limit ? limit : 10,
      relations: ['coupon'],
    });

    const count = await this.orderRepo.count({
      where: { userId: userId },
    });

    const pagination: pagination = {
      currentPage: page,
      limit: limit,
      totalPage: Math.ceil(count / limit),
      nextPage: Math.ceil(count / limit) > page ? page + 1 : null,
      previousPage: page === 1 ? null : page - 1,
    };

    return { orders, pagination };
  }

  async getOrderById(userId: string, id: string) {
    return await this.orderRepo.findOne({
      where: { id: id, userId: userId },
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
