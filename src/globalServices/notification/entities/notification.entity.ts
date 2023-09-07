import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { Order } from '@src/globalServices/order/entities/order.entity';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { NotificationType } from '@src/utils/enums/notification.enum';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('notification')
export class Notification extends BaseEntity {
  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.OFFER,
  })
  type: NotificationType;

  @Column()
  title: string;

  @Column()
  message: string;

  // email message
  @Column({ nullable: true })
  emailMessage: string;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToMany(() => Offer, (offer) => offer.notifications)
  @JoinTable({
    name: 'offer_notification',
    joinColumn: {
      name: 'notification_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'offer_id',
      referencedColumnName: 'id',
    },
  })
  offers: Offer[];

  @ManyToMany(() => Brand, (brand) => brand.notifications)
  @JoinTable({
    name: 'brand_notification',
    joinColumn: {
      name: 'notification_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'brand_id',
      referencedColumnName: 'id',
    },
  })
  brands: Brand[];

  @ManyToMany(() => Reward, (reward) => reward.notifications)
  @JoinTable({
    name: 'reward_notification',
    joinColumn: {
      name: 'notification_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'reward_id',
      referencedColumnName: 'id',
    },
  })
  rewards: Reward[];

  @Column({ nullable: true })
  orderId: string;

  @ManyToOne(() => Order, (order) => order.notifications)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ nullable: true })
  news_id: string;

  // TODO add news entity
}
