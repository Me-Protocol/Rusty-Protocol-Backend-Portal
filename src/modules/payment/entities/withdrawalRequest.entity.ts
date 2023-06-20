import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@src/models/base.entity';
import { User } from '@src/modules/user/entities/user.entity';
import { WalletEntity } from './wallet.entity';
import { WithdrawalMethodsEntity } from './withdrawalMethods.entity';
import { StatusType } from '@src/utils/enums/Transactions';
// import { StatusType } from '@src/utils/enums';

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

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id)
  @JoinColumn({ name: 'walletId' })
  wallet: WalletEntity;

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
