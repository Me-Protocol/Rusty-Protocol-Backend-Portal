import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RewardType } from '../interfaces/reward.inteface';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { TokenReward } from '@src/modules/tokenreward/models/tokenreward.entity';
import { PointsReward } from '@src/modules/pointreward/model/pointreward.entity';

@Entity('rewards')
export class RewardsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  rewardId: string;

  @Column({ nullable: true })
  brandId: string;

  @Column({ nullable: true })
  brandName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true, type: 'enum', enum: RewardType })
  rewardType: RewardType;

  @Column({ nullable: true })
  rewardImage: string;

  @Column({ nullable: true })
  otherRewardType: string;

  @Column({ nullable: true })
  rewardSymbol: string;

  @Column({ nullable: true })
  rewardName: string;

  // @OneToMany(() => Offers, (offer) => offer.reward)
  // offers: OffersEntity[];

  // @ManyToOne(() => Brand, (brand) => brand.rewards)
  // @JoinColumn({ name: 'brandId' })
  // brand: Brand;

  // @OneToMany(() => PointRegistryEntity, (pointRegistry) => pointRegistry.reward)
  // pointRegistry: PointRegistryEntity[];

  // one reward belongs to one token
  // @OneToOne(() => TokenReward, (token) => token.reward)
  // tokenReward: TokenReward;

  @OneToOne(() => PointsReward, (point) => point.reward)
  pointReward: TokenReward;

  @Column({ nullable: true, default: false })
  autoSyncEnabled: boolean;

  // @OneToMany(() => NotificationEntity, (notification) => notification.rewards)
  // notifications: NotificationEntity[];
}
