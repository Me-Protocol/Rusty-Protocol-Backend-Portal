// coupon entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Coupon extends BaseEntity {
  @Column()
  code: string;

  @Column({
    default: false,
    type: 'boolean',
  })
  isUsed: boolean;

  @Column()
  offerId: string;

  @Column()
  userId: string;

  @ManyToOne(() => Offer, (offer) => offer.coupons)
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @ManyToOne(() => User, (user) => user.coupons)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'timestamp',
  })
  expiryDate: Date;

  @OneToOne(() => Order, (order) => order.coupon)
  order?: Order;

  @Column({
    nullable: true,
  })
  orderCode: string;
}
