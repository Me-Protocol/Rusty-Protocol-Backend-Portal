// customer entity

import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Brand } from './brand.entity';
import { RewardRegistry } from '@src/globalServices/reward/entities/registry.entity';

@Entity('brand_customer')
export class BrandCustomer extends BaseEntity {
  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.members)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.brandCustomers)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ default: 0 })
  totalRedeemed: number;

  @Column({ default: 0 })
  totalRedemptionAmount: number;

  @Column({ nullable: true })
  registryId: string;

  @OneToOne(() => RewardRegistry, (registry) => registry.id)
  @JoinColumn({ name: 'registryId' })
  registry: RewardRegistry;
}

// await this.createCustomers(user.id, batch.reward.brandId);
