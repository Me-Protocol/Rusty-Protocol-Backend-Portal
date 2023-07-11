// product entity

import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Category } from '@src/globalServices/category/entities/category.entity';
import { ProductImage } from './productImage.entity';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { Variant } from './variants.entity';
import { Collection } from '@src/globalServices/collections/entities/collection.entity';

@Entity('product')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  brandId: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @Column({
    type: 'enum',
    enum: ItemStatus,
    default: ItemStatus.DRAFT,
  })
  status: ItemStatus;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    nullable: true,
  })
  inventory: number;

  @Column({
    default: false,
  })
  isUnlimited: boolean;

  @Column()
  productCode: string;

  @Column({
    nullable: true,
  })
  subCategoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: Category;

  @OneToMany(() => Offer, (offer) => offer.product)
  offers: Offer[];

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];

  @Column({
    nullable: true,
  })
  collectionId: string;

  @ManyToOne(() => Collection, (collection) => collection.products)
  @JoinColumn({ name: 'collectionId' })
  collection: Collection;
}
