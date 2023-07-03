// variant entity

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { BaseEntity } from '@src/models/base.entity';
import { VarientType } from '@src/utils/enums/VarientType';

@Entity('variant')
export class Variant extends BaseEntity {
  @Column({
    type: 'enum',
    enum: VarientType,
  })
  name: VarientType;

  @Column('text', {
    array: true,
  })
  values: string[];

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'productId' })
  product: Product;

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

  // @Column({
  //   default: false,
  // })
  // isUnlimited: boolean;

  // @Column()
  // sku: string;
}
