import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';

@Entity('admin_settings')
export class AdminSettings extends BaseEntity {
  @Column({
    default: 5000,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  minimumBalanceApi: number;

  @Column({
    default: 1000,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  minimumBalanceInApp: number;

  @Column({
    default: 4,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  topupAmountFactor: number;

  @Column({
    default: 1.2,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  topupLimitFactor: number;

  @Column({
    default: true,
  })
  isDefault: boolean;

  @Column({
    nullable: true,
  })
  meDispenser: string;

  @Column({
    nullable: true,
  })
  onboardWallet: string;

  @Column({
    nullable: true,
  })
  autoTopupWallet: string;

  @Column({
    default: 200,
  })
  maximumRLimit: number;

  @Column({
    default: 0,
  })
  minimumRewardAmountForConversion: number;

  @Column({
    default: 0,
  })
  minimumMeAmountForConversion: number;

  @Column({
    default: 20,
  })
  notifyRewardAmount: number;

  @Column({
    default: 20,
  })
  notifyMeTokenAmount: number;

  @Column({
    default: 2,
  })
  minimumOpenRewardSetupFactor: number;

  @Column({
    default: 5,
  })
  maximumOpenRewardSetupFactor: number;

  @Column({
    default: 2,
  })
  rewardAutoTopUpFactor: number;

  @Column({
    default: 2,
  })
  meAutoTopUpFactor: number;

  @Column({
    type: 'decimal',
    default: 0.09,
  })
  meTokenValue: number;
}
