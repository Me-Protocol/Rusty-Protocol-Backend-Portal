// api_key entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Bill } from './bill.entity';

@Entity('invoice')
export class Invoice extends BaseEntity {
  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.bills)
  brand: Brand;

  @Column()
  invoiceCode: string;

  @Column({
    default: false,
  })
  isPaid: boolean;

  @Column({
    default: false,
  })
  isDue: boolean;

  @OneToMany(() => Bill, (bill) => bill.invoice)
  bills: Bill[];

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 20,
    default: 0,
    nullable: true,
  })
  total: number;
}
