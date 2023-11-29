// api_key entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity('reward_circulation')
export class RewardCirculation extends BaseEntity {
  @Column()
  circulatingSupply: number;

  @Column()
  totalDistributedSupplyAtCirculation: number;

  @Column()
  totalRedeemedAtCirculation: number;

  @Column()
  brandId: string;

  @Column()
  rewardId: string;
}
