import { BaseEntity } from '@src/common/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Region } from './region.entity';

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

  @OneToMany(() => Region, (region) => region.currency)
  regions: Region[];
}
