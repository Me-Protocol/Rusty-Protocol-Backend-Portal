import { BaseEntity } from '@src/common/entities/base.entity';
import { TransactionsType } from '@src/utils/enums/Transactions';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RewardRegistry } from './registry.entity';

@Entity('registry_history')
export class RegistryHistory extends BaseEntity {
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  balance: number;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TransactionsType })
  transactionType: TransactionsType;

  @Column()
  rewardRegistryId: string;

  @ManyToOne(() => RewardRegistry, (registry) => registry.registryHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'rewardRegistryId' })
  rewardRegistry: RewardRegistry;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amount: number;
}
