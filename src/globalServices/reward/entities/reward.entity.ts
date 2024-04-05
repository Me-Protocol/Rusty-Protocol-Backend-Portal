import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { TokenBlockchain } from '@src/utils/enums/reward.enum';
import { Task } from '@src/globalServices/task/entities/task.entity';
import { SyncBatch } from './syncBatch.entity';
import { RewardRegistry } from './registry.entity';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { Notification } from '@src/globalServices/notification/entities/notification.entity';
import { RewardStatus } from '@src/utils/enums/ItemStatus';

@Entity('reward')
export class Reward extends BaseEntity {
  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.rewards)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  slug: string;

  @Column({
    nullable: true,
  })
  rewardImage: string;

  @Column({ nullable: true })
  otherRewardType: string;

  @Column({
    nullable: true,
  })
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

  @Column({ nullable: true, default: false })
  isBounty?: boolean;

  @Column({
    type: 'enum',
    enum: TokenBlockchain,
    nullable: true,
  })
  blockchain: TokenBlockchain;

  @Column('text', { nullable: true, array: true, default: [] })
  acceptedCustomerIdentitytypes: string[];

  @OneToMany(() => SyncBatch, (syncBatch) => syncBatch.reward)
  syncBatches: SyncBatch[];

  @OneToMany(() => RewardRegistry, (rewardRegistry) => rewardRegistry.reward)
  rewardRegistries: RewardRegistry[];

  @Column('text', {
    array: true,
    name: 'syncData',
    nullable: true,
    select: false,
  })
  syncData: {
    id: string;
    identifier: string;
    identifierType: SyncIdentifierType;
    amount: number;
  }[];

  @Column({
    nullable: true,
  })
  redistributionPublicKey: string;

  @Column({
    nullable: true,
  })
  campaignPublicKey: string;

  @Column({
    nullable: true,
  })
  bountyPublicKey: string;

  @Column({
    nullable: true,
  })
  redistributionKeyIdentifierId: string;

  @Column({
    nullable: true,
  })
  campaignKeyIdentifierId: string;

  @Column({
    nullable: true,
  })
  bountyKeyIdentifierId: string;

  @Column({
    default: 0.984,
    type: 'decimal',
    scale: 5,
  })
  rewardValueInDollars: number;

  @Column({
    default: true,
  })
  rewardValueIsManual: boolean;

  @ManyToMany(() => Notification, (notification) => notification.rewards)
  notifications: Notification[];

  @Column({
    type: 'enum',
    enum: RewardStatus,
    default: RewardStatus.DRAFT,
  })
  status: RewardStatus;

  @Column({
    nullable: true,
    type: 'decimal',
    default: 0.0,
  })
  poolTotalSupply: string;

  @Column({
    nullable: true,
    type: 'decimal',
    default: 0.0,
  })
  rewardDollarPrice: string;

  @Column({
    nullable: true,
    type: 'decimal',
    default: 0.0,
  })
  rOptimal: string;

  @Column({
    nullable: true,
    type: 'decimal',
    default: 0.0,
  })
  treasurySupply: string;

  @Column({
    type: 'decimal',
    default: 0.0,
  })
  totalSupply: number;

  @Column({
    type: 'decimal',
    default: 0.0,
  })
  totalIssued: number;

  @Column({
    type: 'decimal',
    default: 0.0,
  })
  totalDistributed: number;

  @Column({
    type: 'decimal',
    default: 0.0,
  })
  totalRedeemedSupply: number;

  @Column({
    default: 2,
  })
  rewardAutoTopUpFactor: number;

  @Column({
    default: 2,
  })
  meAutoTopUpFactor: number;

  @Column({
    default: false,
  })
  addedLiquidity: boolean;

  @Column({
    type: 'decimal',
    default: 0.0,
  })
  totalVaultSupply: number;

  @Column({
    type: 'decimal',
    default: 0.0,
  })
  availableVaultSupply: number;

  @Column({
    type: 'decimal',
    default: 0.0,
  })
  availableTreasurySupply: number;
}
