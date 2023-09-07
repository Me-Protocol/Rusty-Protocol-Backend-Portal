import { BaseEntity } from '@src/common/entities/base.entity';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Coupon } from './coupon.entity';
import { Notification } from '@src/globalServices/notification/entities/notification.entity';

@Entity('order')
export class Order extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  offerId: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  points: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: true, default: false })
  isRedeemed: boolean;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Offer, (offer) => offer.orders)
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @Column({
    nullable: true,
  })
  couponId: string;

  @OneToOne(() => Coupon, (coupon) => coupon.order)
  @JoinColumn({ name: 'couponId' })
  coupon: Coupon;

  @OneToMany(() => Notification, (notification) => notification.order)
  notifications: Notification[];
}
