import { BaseEntity } from '@src/models/base.entity';
import { Task } from '@src/models/tasks.entity';
import { RewardsEntity } from '@src/modules/reward/models/rewards.entity';
import { TokenBlockchain } from '@src/utils/enums/reward.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tokenreward')
export class TokenReward extends BaseEntity {
  @Column({ nullable: true })
  tokenRewardId: string;

  @Column({ nullable: true })
  rewardId?: string;

  @Column({ nullable: true })
  tokenId?: string;

  @Column({ nullable: true })
  brandName?: string;

  @Column({ nullable: true })
  rewardName?: string;

  @Column({ nullable: true })
  contractAddress?: string;

  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true, default: false })
  isBounty?: boolean;

  @Column({
    type: 'enum',
    enum: TokenBlockchain,
    default: TokenBlockchain.Ethereum,
  })
  blockchain: TokenBlockchain;

  // @OneToMany(() => Task, (task) => task.token)
  // tasks?: Task[];

  // one token belongs to one reward
  // @OneToOne(() => RewardsEntity, (reward) => reward.tokenReward)
  // @JoinColumn({ name: 'rewardId' })
  // reward?: RewardsEntity;
}
