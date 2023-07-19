import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { Reward } from './reward.entity';

@Entity('sync_batch')
export class SyncBatch extends BaseEntity {
  @Column()
  rewardId: string;

  @ManyToOne(() => Reward, (reward) => reward.syncBatches)
  @JoinColumn({ name: 'rewardId' })
  reward: Reward;

  @Column()
  description: string;

  @Column('text', {
    array: true,
    name: 'syncData',
  })
  syncData: {
    id: string;
    identifier: string;
    identifierType: SyncIdentifierType;
    amount: number;
  }[];

  @Column({
    default: false,
  })
  isDistributed: boolean;
}
