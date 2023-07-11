import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { PaymentEntity } from './payment.entity';
import { WithdrawalMethodsEntity } from './withdrawalMethods.entity';
import { StatusType } from '@src/utils/enums/Transactions';
import { User } from '@src/globalServices/user/entities/user.entity';

@Entity('withdrawalRequest')
export class WithdrawalRequestEntity extends BaseEntity {
  @Column()
  userId: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

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

  @Column()
  walletId: string;

  @ManyToOne(() => PaymentEntity, (wallet) => wallet.id)
  @JoinColumn({ name: 'walletId' })
  wallet: PaymentEntity;

  @Column({
    nullable: true,
  })
  methodId: string;

  @ManyToOne(() => WithdrawalMethodsEntity, (method) => method.id)
  @JoinColumn({ name: 'methodId' })
  method: WithdrawalMethodsEntity;

  @Column({
    nullable: true,
  })
  stripeLinkedAccountId: string;

  @Column({
    nullable: true,
  })
  verificationCode: number;

  @Column()
  reference: string;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.PROCESSING,
  })
  status: StatusType;
}
