import { BaseEntity } from '@src/common/entities/base.entity';
import { TransactionsType } from '@src/utils/enums/Transactions';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RewardRegistry } from './registry.entity';

@Entity('registry_history')
export class RegistryHistory extends BaseEntity {
  @Column()
  balance: string;

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

  @Column()
  customerId?: string;

  @Column({ nullable: true })
  amount: number;

  @ManyToOne(
    () => PointRegistryEntity,
    (pointRegistry) => pointRegistry.pointdebitcredit,
  )
  @JoinColumn({ name: 'pointRegistryId' })
  pointRegistry: PointRegistryEntity;
}
