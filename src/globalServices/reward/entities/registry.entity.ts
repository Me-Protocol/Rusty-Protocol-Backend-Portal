import { BaseEntity } from '@src/common/entities/base.entity';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Reward } from './reward.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { RegistryHistory } from './registryHistory.entity';

@Entity('reward_registry')
export class RewardRegistry extends BaseEntity {
  @Column({ nullable: true })
  rewardId: string;

  @ManyToOne(() => Reward, (reward) => reward.rewardRegistries)
  @JoinColumn({ name: 'rewardId' })
  reward: Reward;

  @Column({ default: true })
  customerPermitAutoSync: boolean;

  @Column()
  customerIdentiyOnBrandSite: string;

  @Column({ type: 'enum', enum: SyncIdentifierType })
  customerIdentityType: SyncIdentifierType;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0,
  })
  balance: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0,
  })
  pendingBalance: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0,
  })
  undistributedBalance: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0,
  })
  totalBalance: number;

  @Column({
    nullable: true,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.rewardRegistries)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(
    () => RegistryHistory,
    (registryHistory) => registryHistory.rewardRegistry,
  )
  registryHistory: RegistryHistory[];

  @Column({
    default: false,
  })
  hasBalance: boolean;
}
