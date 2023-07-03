// offer entity

import { BaseEntity } from '@src/models/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { User } from '@src/globalServices/user/entities/user.entity';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { ProductImage } from '@src/globalServices/product/entities/productImage.entity';

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
  discountPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  discountPercentage: number;

  @Column()
  offerCode: string;
}
