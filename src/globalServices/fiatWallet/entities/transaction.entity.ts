// transaction entity

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { StatusType, TransactionsType } from '@src/utils/enums/Transactions';
import { FiatWallet } from './fiatWallet.entity';
// import { StatusType, TransactionType } from '@src/utils/enums';

@Entity('transaction')
export class Transaction extends BaseEntity {
  @Column({
    nullable: true,
  })
  walletId: string;

  @ManyToOne(() => FiatWallet, (fiatWallet) => fiatWallet.id)
  @JoinColumn({ name: 'walletId' })
  fiatWallet: FiatWallet;

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
    nullable: true,
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

  @Column()
  narration: string;
}
