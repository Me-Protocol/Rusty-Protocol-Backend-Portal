// customer entity

import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { NotificationFormat } from '@src/utils/enums/NotificationFormat';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('customer')
export class Customer extends BaseEntity {
  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ default: false })
  login_2fa: boolean;

  @Column({ default: false })
  deposit_2fa: boolean;

  @Column({ default: false })
  withdraw_2fa: boolean;

  @Column('text', { array: true, nullable: true })
  sizes: string[];

  @Column({ nullable: true, default: NotificationFormat.NONE })
  news_notifications: NotificationFormat;

  @Column({ nullable: true, default: NotificationFormat.NONE })
  offer_notifications: NotificationFormat;

  @Column({ nullable: true, default: NotificationFormat.NONE })
  brand_notifications: NotificationFormat;

  @Column({ nullable: true, default: NotificationFormat.NONE })
  expiring_notifications: NotificationFormat;

  @Column({ nullable: true, default: NotificationFormat.NONE })
  point_notifications: NotificationFormat;

  @Column({ nullable: true, default: NotificationFormat.NONE })
  order_notifications: NotificationFormat;

  @Column({ nullable: true, default: NotificationFormat.NONE })
  other_notifications: NotificationFormat;

  @Column({ nullable: true })
  walletAddress: string;

  @Column({
    default: 0,
  })
  totalRedeemed: number;

  @Column({
    default: 0,
  })
  totalRedemptionAmount: number;

  @Column({
    default: true,
  })
  firstTimeLogin: boolean;
}
