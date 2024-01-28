// customer entity

import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Brand } from './brand.entity';
import { RewardRegistry } from '@src/globalServices/reward/entities/registry.entity';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';

@Entity('brand_customer')
export class BrandCustomer extends BaseEntity {
  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.members)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column({
    nullable: true,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.brandCustomers)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ default: 0 })
  totalRedeemed: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  totalRedemptionAmount: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  totalIssued: number;

  @Column({
    nullable: true,
  })
  identifier: string;

  @Column({
    type: 'enum',
    enum: SyncIdentifierType,
    nullable: true,
  })
  identifierType: SyncIdentifierType;
}

// await this.createCustomers(user.id, batch.reward.brandId);
