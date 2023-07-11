import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('share')
export class Share extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  medium: string;

  @Column({
    nullable: true,
  })
  userId: string;

  @Column()
  offerId: string;

  @Column()
  shareUrl: string;

  @ManyToOne(() => Offer, (offer) => offer.shares, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @ManyToOne(() => User, (user) => user.shares, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
