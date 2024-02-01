// api_key entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity('bill')
export class Bill extends BaseEntity {
  @Column()
  invoiceId: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.id)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @Column()
  type: string;

  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.bills)
  brand: Brand;
}
