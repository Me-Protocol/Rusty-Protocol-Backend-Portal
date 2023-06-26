// transaction entity

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@src/models/base.entity';
import { StatusType, TransactionsType } from '@src/utils/enums/Transactions';
import { PaymentEntity } from './payment.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
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

  @ManyToOne(() => PaymentEntity, (wallet) => wallet.id)
  @JoinColumn({ name: 'walletId' })
  wallet: PaymentEntity;

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
