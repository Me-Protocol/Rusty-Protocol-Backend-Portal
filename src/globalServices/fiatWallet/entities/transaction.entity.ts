// transaction entity

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import {
  StatusType,
  TransactionSource,
  TransactionsType,
} from '@src/utils/enums/Transactions';
import { FiatWallet } from './fiatWallet.entity';
import { PaymentMethodEnum } from '@src/utils/enums/PaymentMethodEnum';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { Order } from '@src/globalServices/order/entities/order.entity';
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
    default: PaymentMethodEnum.STRIPE,
    enum: PaymentMethodEnum,
    type: 'enum',
  })
  paymentMethod: PaymentMethodEnum;

  @Column()
  narration: string;

  @Column({
    type: 'enum',
    enum: TransactionSource,
    default: TransactionSource.REWARD_DISTRIBUTION,
  })
  source: TransactionSource;

  @Column({
    nullable: true,
  })
  rewardId: string;

  @ManyToOne(() => Reward, (reward) => reward.id)
  @JoinColumn({ name: 'rewardId' })
  reward: Reward;

  @Column({
    nullable: true,
  })
  orderId: string;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({
    default: false,
  })
  appliedMeCredit: boolean;
}
