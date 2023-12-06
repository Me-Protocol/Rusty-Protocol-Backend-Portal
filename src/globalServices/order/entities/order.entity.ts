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
import { StatusType } from '@src/utils/enums/Transactions';
import { OrderPaymentType } from '@src/utils/enums/OrderPaymentType';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { OrderVerifier } from '@src/utils/enums/OrderVerifier';
import { SpendData } from '@src/utils/types/spendData';

@Entity('order')
export class Order extends BaseEntity {
  @Column()
  userId: string;

  @Column({
    unique: true,
    default: () => `substr(uuid_generate_v4()::text, 1, 6)`,
  })
  orderCode: string;

  @Column()
  offerId: string;

  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.orders)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

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

  @Column({ nullable: true })
  taskId: string;

  @Column({
    enum: StatusType,
    default: StatusType.PROCESSING,
  })
  status: StatusType;

  @Column({
    type: 'enum',
    enum: OrderPaymentType,
    default: OrderPaymentType.TOKEN,
  })
  paymentType: OrderPaymentType;

  @Column({
    type: 'enum',
    enum: OrderVerifier,
    default: OrderVerifier.GELATO,
  })
  verifier: OrderVerifier;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  spendData: SpendData;
}
