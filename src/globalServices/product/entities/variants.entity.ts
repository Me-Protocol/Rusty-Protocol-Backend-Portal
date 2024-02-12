// variant entity

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { VariantOption } from '@src/globalServices/product/entities/variantvalue.entity';

@Entity('variant')
export class Variant extends BaseEntity {
  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    default: false,
  })
  isCustom: boolean;

  @Column({
    nullable: true,
  })
  productId: string;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @OneToMany(() => VariantOption, (variantValue) => variantValue.variant)
  options: VariantOption[];
}
