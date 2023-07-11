// offer entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { ProductImage } from '@src/globalServices/product/entities/productImage.entity';
import { View } from '@src/globalServices/views/entities/view.entity';
import { Share } from '@src/globalServices/share/entities/share.entity';
import { Review } from '@src/globalServices/review/entities/review.entity';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { Like } from '@src/globalServices/like/entities/like.entity';
import { Task } from '@src/globalServices/task/entities/task.entity';

@Entity('offer')
export class Offer extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ItemStatus,
    default: ItemStatus.DRAFT,
  })
  status: ItemStatus;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  brandId: string;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.offers)
  product: Product;

  @OneToMany(() => ProductImage, (productImage) => productImage.offer)
  productImages: ProductImage[];

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  originalPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  discountPercentage: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  tokens: number;

  @Column()
  offerCode: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    default: 0,
  })
  viewCount: number;

  @Column({
    default: 0,
  })
  likeCount: number;

  @Column({
    default: 0,
  })
  shareCount: number;

  @Column({
    default: 0,
  })
  commentCount: number;

  @Column({
    type: 'timestamp',
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
  })
  endDate: Date;

  @OneToMany(() => View, (view) => view.user)
  views: View[];

  @OneToMany(() => Share, (share) => share.user)
  shares: Share[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Column()
  rewardId: string;

  @ManyToOne(() => Reward, (reward) => reward.offers)
  reward: Reward;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Task, (task) => task.offer)
  tasks: Task[];
}
