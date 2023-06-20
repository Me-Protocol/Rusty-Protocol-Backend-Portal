// transaction entity

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@src/models/base.entity';
import { User } from '@src/modules/user/entities/user.entity';
import { WalletEntity } from './wallet.entity';
import { StatusType, TransactionsType } from '@src/utils/enums/Transactions';
// import { StatusType, TransactionType } from '@src/utils/enums';

@Entity('transaction')
export class TransactionEntity extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  walletId: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id)
  @JoinColumn({ name: 'walletId' })
  wallet: WalletEntity;

  @Column({
    type: 'enum',
    enum: TransactionsType,
  })
  transactionType: TransactionsType;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amount: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  balance: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: StatusType,
  })
  status: StatusType;

  @Column({
    nullable: true,
  })
  paymentRef: string;

  @Column({
    default: 'Stripe',
  })
  paymentMethod: string;
}
