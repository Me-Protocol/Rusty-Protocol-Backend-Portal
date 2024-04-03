import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  create({
    user_id,
    offer_id,
    isUsed,
    couponCode,
    orderCode,
  }: {
    user_id: string;
    offer_id: string;
    isUsed?: boolean;
    couponCode: string;
    orderCode: string;
  }) {
    // 6 characters coupon code

    const coupon = new Coupon();
    coupon.code = couponCode;
    coupon.isUsed = isUsed ?? false;
    coupon.offerId = offer_id;
    coupon.userId = user_id;
    coupon.expiryDate = new Date();
    coupon.orderCode = orderCode;
    coupon.expiryDate.setDate(coupon.expiryDate.getDate() + 7);

    return this.couponRepository.save(coupon);
  }

  async findOne(code: string): Promise<Coupon> {
    return await this.couponRepository.findOneBy({ code });
  }

  async findOneById(id: string) {
    return await this.couponRepository.findOneBy({ id });
  }

  async couponByOrderCode(orderCode: string): Promise<Coupon> {
    return await this.couponRepository.findOneBy({ orderCode });
  }

  async update(id: string, coupon: Coupon): Promise<any> {
    return await this.couponRepository.update(id, coupon);
  }

  async saveCoupon(coupon: Coupon): Promise<Coupon> {
    return await this.couponRepository.save(coupon);
  }

  async remove(id: number): Promise<any> {
    return await this.couponRepository.softDelete(id);
  }

  async validateCoupon(code: string): Promise<any> {
    const checkCode = await this.couponRepository.findOneBy({ code });

    if (!checkCode) {
      throw new Error('Invalid coupon code');
    }

    if (checkCode.isUsed) {
      throw new Error('Coupon code already used');
    }

    if (new Date(checkCode.expiryDate) < new Date()) {
      throw new Error('Coupon code expired');
    }

    return {
      success: true,
      message: 'Coupon code valid',
    };
  }

  async useCoupon({
    code,
    idOnBrandSite,
    brandId,
  }: {
    code: string;
    idOnBrandSite: string;
    brandId: string;
  }): Promise<any> {
    const coupon = await this.couponRepository.findOne({
      where: {
        code: code,
        offer: {
          brandId,
        },
      },
      relations: ['offer', 'user'],
    });

    if (!coupon) {
      throw new HttpException('Invalid coupon code', 400);
    }

    if (coupon.isUsed) {
      throw new HttpException('Coupon code already used', 400);
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      throw new HttpException('Coupon code expired', 400);
    }

    coupon.isUsed = true;

    await this.couponRepository.save(coupon);

    return {
      success: true,
      message: 'Coupon code used',
    };
  }

  async generateCouponCode(): Promise<string> {
    const code = `${process.env.COUPON_CODE_PREFIX}_${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    const checkCode = await this.couponRepository.findOne({
      where: { code },
    });

    if (checkCode) {
      return await this.generateCouponCode();
    }

    return code;
  }
}
