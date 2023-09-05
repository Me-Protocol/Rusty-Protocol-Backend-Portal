// productImage entity

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Product } from './product.entity';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';

@Entity('product_image')
export class ProductImage extends BaseEntity {
  @Column()
  url: string;

  @ManyToOne(() => Product, (product) => product.productImages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ nullable: true })
  productId: string;

  @ManyToOne(() => Offer, (offer) => offer.offerImages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @Column({ nullable: true })
  offerId: string;
}
