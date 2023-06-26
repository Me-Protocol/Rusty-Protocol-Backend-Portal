import { BaseEntity } from '@src/models/base.entity';
import { RewardsEntity } from '@src/modules/reward/models/rewards.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pointsreward')
export class PointsReward extends BaseEntity {
  @Column({ nullable: false })
  pointsrewardId: string;

  @Column({ nullable: true })
  rewardId: string;

  @Column({ nullable: false })
  rewardName: string;

  @Column({ nullable: false })
  rewardNameSlug: string;

  @Column({ nullable: false })
  brandName: string;

  @Column({ nullable: true, default: false })
  autoSyncEnabled: boolean;

  @Column({ nullable: false })
  syncApiAddress: string;

  @Column({ nullable: false })
  syncApiAccessToken: string;

  @Column({ nullable: false })
  syncApiRefreshToken: string;

  @Column({ nullable: true })
  oidcDiscoveryAddress: string;

  @Column('text', { array: true, default: [] })
  handlesConnected: string[];

  @Column('text', { nullable: true, array: true, default: [] })
  acceptedCustomerIdentitytypes: string[];

  @OneToOne(() => RewardsEntity, (reward) => reward.pointReward)
  @JoinColumn({ name: 'rewardId' })
  reward: RewardsEntity;
}
