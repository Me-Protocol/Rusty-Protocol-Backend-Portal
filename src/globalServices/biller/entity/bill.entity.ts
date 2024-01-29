// api_key entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity('bill')
export class Bill extends BaseEntity {
  @Column()
  invoiceId: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.bills)
  invoice: Invoice;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 20,
    nullable: true,
  })
  amount: number;

  @Column()
  type: string;

  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.bills)
  brand: Brand;
}
