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
}
