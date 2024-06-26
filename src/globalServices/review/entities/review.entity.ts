import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';

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
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

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
