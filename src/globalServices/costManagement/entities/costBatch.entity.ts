// cost batch

import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PaymentRequest } from './paymentRequest.entity';
import { CostCollection } from './costCollection';

@Entity('cost_batch')
export class CostBatch extends BaseEntity {
  @OneToMany(() => PaymentRequest, (paymentRequest) => paymentRequest.costBatch)
  paymentRequests: PaymentRequest[];

  @Column({
    default: false,
  })
  isPaid: boolean;

  @Column({
    default: false,
  })
  isClosed: boolean;

  @OneToMany(() => CostCollection, (costCollection) => costCollection.costBatch)
  costCollections: CostCollection[];
}
