import { BaseEntity } from '@src/common/entities/base.entity';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Reward } from './reward.entity';
import { User } from '@src/globalServices/user/entities/user.entity';

@Entity('reward_registry')
export class RewardRegistry extends BaseEntity {
  @Column({ nullable: true })
  rewardId: string;

  @ManyToOne(() => Reward, (reward) => reward.rewardRegistries)
  @JoinColumn({ name: 'rewardId' })
  reward: Reward;

  @Column({ nullable: true })
  customerPermitAutoSync: boolean;

  @Column()
  customerIdentiyOnBrandSite: string;

  @Column({ nullable: true, type: 'enum', enum: SyncIdentifierType })
  customerIdentityType: SyncIdentifierType;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  balance: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.rewardRegistries)
  @JoinColumn({ name: 'userId' })
  user: User;
}
