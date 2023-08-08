// cost batch

import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PaymentRequest } from './paymentRequest.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { CostBatch } from './costBatch.entity';

@Entity('cost_collection')
export class CostCollection extends BaseEntity {
  @Column({
    type: 'decimal',
    precision: 20,
    scale: 20,
    nullable: true,
  })
  totalCost: number;

  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.costCollections)
  brand: Brand;

  @Column()
  costBatchId: string;

  @ManyToOne(() => CostBatch, (costBatch) => costBatch.costCollections)
  costBatch: CostBatch;
}
