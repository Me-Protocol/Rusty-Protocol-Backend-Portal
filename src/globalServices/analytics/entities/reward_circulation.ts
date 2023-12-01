// api_key entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity('reward_circulation')
export class RewardCirculation extends BaseEntity {
  @Column({
    type: 'decimal',
  })
  circulatingSupply: number;

  @Column({
    type: 'decimal',
  })
  totalDistributedSupplyAtCirculation: number;

  @Column({
    type: 'decimal',
  })
  totalRedeemedAtCirculation: number;

  @Column()
  brandId: string;

  @Column()
  rewardId: string;
}
