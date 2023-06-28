// productImage entity

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@src/models/base.entity';
import { Product } from './product.entity';

@Entity('product_image')
export class ProductImage extends BaseEntity {
  @Column()
  url: string;

  @ManyToOne(() => Product, (product) => product.productImages)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: string;
}
