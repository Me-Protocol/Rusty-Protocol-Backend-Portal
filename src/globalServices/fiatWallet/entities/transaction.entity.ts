// transaction entity

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { StatusType, TransactionsType } from '@src/utils/enums/Transactions';
import { User } from '@src/globalServices/user/entities/user.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
// import { StatusType, TransactionType } from '@src/utils/enums';

@Entity('transaction')
export class Transaction extends BaseEntity {
  @Column({
    nullable: true,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    nullable: true,
  })
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.id)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

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

  @Column()
  narration: string;
}
