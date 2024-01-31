import { BaseEntity } from '@src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('currency')
export class Currency extends BaseEntity {
  @Column({
    type: 'decimal',
    precision: 20,
    scale: 20,
  })
  value: number;

  @Column()
  currency: string;
}
