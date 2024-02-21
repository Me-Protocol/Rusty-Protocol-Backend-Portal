// customer entity

import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Brand } from './brand.entity';
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

  @Column({ type: 'decimal', default: 0 })
  totalRedemptionAmount: number;

  @Column({ default: 0, nullable: true })
  totalExternalRedeemed: number;

  @Column({ type: 'decimal', nullable: true, default: 0 })
  totalExternalRedemptionAmount: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  totalIssued: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  totalDistributed: number;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  name: string;

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

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    default: false,
  })
  isOnboarded: boolean;
}

// await this.createCustomers(user.id, batch.reward.brandId);
