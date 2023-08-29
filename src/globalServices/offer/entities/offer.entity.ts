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
import { Order } from '@src/globalServices/order/entities/order.entity';
import { Coupon } from '@src/globalServices/order/entities/coupon.entity';

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
  offerImages: ProductImage[];

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

  @Column()
  idOnBrandsite: string;

  @OneToMany(() => View, (view) => view.offer)
  views: View[];

  @OneToMany(() => Share, (share) => share.offer)
  shares: Share[];

  @OneToMany(() => Review, (review) => review.offer)
  reviews: Review[];

  @Column()
  rewardId: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  totalSales: number;

  @Column({
    default: 0,
  })
  totalOrders: number;

  @ManyToOne(() => Reward, (reward) => reward.offers)
  reward: Reward;

  @OneToMany(() => Like, (like) => like.offer)
  likes: Like[];

  @OneToMany(() => Task, (task) => task.offer)
  tasks: Task[];

  @OneToMany(() => Order, (order) => order.offer)
  orders: Order[];

  @OneToMany(() => Coupon, (coupon) => coupon.offer)
  coupons: Coupon[];
}
