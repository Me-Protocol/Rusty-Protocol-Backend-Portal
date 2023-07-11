// withdrawalMethods entity

import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';

@Entity('withdrawal_methods')
export class WithdrawalMethodsEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  //TODO: add withrawal type enum
  // @Column({ type: 'enum' })
  // type: any;

  @Column()
  min: number;

  @Column()
  max: number;

  @Column()
  fee: number;

  @Column('text', { array: true })
  countries: string[];
}
