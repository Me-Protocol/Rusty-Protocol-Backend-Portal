import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('brand_subscription_plan')
export class BrandSubscriptionPlan extends BaseEntity {
  @Column()
  name: string;

  @Column()
  monthlyAmount: number;

  @Column()
  description: string;
}
