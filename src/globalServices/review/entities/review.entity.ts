import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/models/base.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column({
    nullable: true,
  })
  title: string;

  @Column()
  review: string;

  @Column()
  rating: number;

  @Column()
  userId: string;

  @Column()
  offerId: string;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Offer, (offer) => offer.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'offerId' })
  offer: Offer;
}
