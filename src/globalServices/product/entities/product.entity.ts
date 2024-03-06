// product entity

import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Category } from '@src/globalServices/category/entities/category.entity';
import { ProductImage } from './productImage.entity';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { Variant } from './variants.entity';
import { Collection } from '@src/globalServices/collections/entities/collection.entity';
import { Currency } from '@src/globalServices/currency/entities/currency.entity';
import { Region } from '@src/globalServices/currency/entities/region.entity';

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

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({
    nullable: true,
  })
  categoryId: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  status: ProductStatus;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
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

  @OneToMany(() => Offer, (offer) => offer.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  offers: Offer[];

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];

  @ManyToMany(() => Collection, (collection) => collection.products, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'product_collections',
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'collectionId',
      referencedColumnName: 'id',
    },
  })
  collections: Collection[];

  @Column({
    default: 'N/A',
  })
  productUrl: string;

  @Column({
    nullable: true,
  })
  minAge: number;

  @Column({
    nullable: true,
  })
  currencyId: string;

  @ManyToOne(() => Currency, (currency) => currency.id)
  @JoinColumn({ name: 'currencyId' })
  currency: Currency;

  @Column({
    nullable: true,
  })
  coverImage: string;

  @Column({
    nullable: true,
  })
  productIdOnBrandSite: string;

  @ManyToMany(() => Region, (region) => region.products)
  @JoinTable({
    name: 'product_regions',
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'regionId',
      referencedColumnName: 'id',
    },
  })
  regions: Region[];
}
