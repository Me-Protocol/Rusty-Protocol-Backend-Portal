// api_key entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { BrandSubscriptionPlan } from '@src/globalServices/brand/entities/brand_subscription_plan.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('voucher')
export class Voucher extends BaseEntity {
  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.id)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column({
    default: false,
  })
  isUsed: boolean;

  @Column({
    default: false,
  })
  isExpired: boolean;

  @Column({
    nullable: true,
  })
  expiredAt: Date;

  @Column({
    nullable: true,
  })
  usedAt: Date;

  @Column()
  discount: number;

  @Column()
  planId: string;

  @ManyToOne(
    () => BrandSubscriptionPlan,
    (brandSubscriptionPlan) => brandSubscriptionPlan.id,
  )
  @JoinColumn({ name: 'planId' })
  plan: BrandSubscriptionPlan;

  @Column({
    nullable: true,
  })
  usageLimit: number;

  @Column({
    nullable: true,
  })
  usageCount: number;
}
