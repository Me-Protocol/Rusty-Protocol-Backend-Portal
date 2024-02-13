import { BaseEntity } from '@src/common/entities/base.entity';
import { Variant } from '@src/globalServices/product/entities/variants.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('variant_option')
export class VariantOption extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({
    nullable: true,
  })
  value: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
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

  @Column()
  variantId: string;

  @ManyToOne(() => Variant, (variant) => variant.options, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'variantId' })
  variant: Variant;
}
