// customer entity

import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Brand } from './brand.entity';

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
}

// await this.createCustomers(user.id, batch.reward.brandId);
