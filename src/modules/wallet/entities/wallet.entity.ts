// wallet entity

import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@src/models/base.entity';
import { User } from '@src/modules/user/entities/user.entity';

@Entity('wallet')
export class WalletEntity extends BaseEntity {
  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  balance: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  totalWithdraw: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  totalDeposit: number;

  @Column({
    nullable: true,
  })
  stripeCustomerId: string;

  @Column({
    nullable: true,
  })
  stripeAccountId: string;
}
