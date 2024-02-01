import { BaseEntity } from '@src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('currency')
export class Currency extends BaseEntity {
  @Column({
    type: 'decimal',
  })
  value: number;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column()
  code: string;
}
