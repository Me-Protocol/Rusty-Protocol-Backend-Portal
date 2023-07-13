import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { TokenBlockchain } from '@src/utils/enums/reward.enum';
import { RewardType } from '@src/utils/enums/RewardType';
import { Task } from '@src/globalServices/task/entities/task.entity';
import { SyncBatch } from './syncBatch.entity';
import { RewardRegistry } from './registry.entity';

@Entity('reward')
export class Reward extends BaseEntity {
  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.rewards)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  description: string;

  @Column()
  slug: string;

  @Column({ type: 'enum', enum: RewardType })
  rewardType: RewardType;

  @Column()
  rewardImage: string;

  @Column({ nullable: true })
  otherRewardType: string;

  @Column()
  rewardSymbol: string;

  @Column({ nullable: true })
  rewardName: string;

  @OneToMany(() => Offer, (offer) => offer.reward)
  offers: Offer[];

  @OneToMany(() => Task, (task) => task.reward)
  tasks: Task[];

  // @OneToMany(() => PointRegistryEntity, (pointRegistry) => pointRegistry.reward)
  // pointRegistry: PointRegistryEntity[];

  // one reward belongs to one token
  // @OneToOne(() => TokenReward, (token) => token.reward)
  // tokenReward: TokenReward;

  @Column({ nullable: true, default: false })
  autoSyncEnabled: boolean;

  // @OneToMany(() => NotificationEntity, (notification) => notification.rewards)
  // notifications: NotificationEntity[];

  @Column({ nullable: true })
  contractAddress?: string;

  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true, default: false })
  isBounty?: boolean;

  @Column({
    type: 'enum',
    enum: TokenBlockchain,
    nullable: true,
  })
  blockchain: TokenBlockchain;

  @Column({ nullable: false })
  syncApiAddress: string;

  @Column({ nullable: false })
  syncApiAccessToken: string;

  @Column({ nullable: false })
  syncApiRefreshToken: string;

  @Column({ nullable: true })
  oidcDiscoveryAddress: string;

  @Column('text', { nullable: true, array: true, default: [] })
  acceptedCustomerIdentitytypes: string[];

  @OneToMany(() => SyncBatch, (syncBatch) => syncBatch.reward)
  syncBatches: SyncBatch[];

  @OneToMany(() => RewardRegistry, (rewardRegistry) => rewardRegistry.reward)
  rewardRegistries: RewardRegistry[];
}
