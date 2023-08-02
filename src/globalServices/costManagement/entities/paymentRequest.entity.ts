import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { PaymentRequestTnxType } from '@src/utils/enums/PaymentRequestTnxType';
import { Entity, Column, ManyToOne } from 'typeorm';
import { CostBatch } from './costBatch.entity';
import { supportedNetworks } from '../symbol-finder.service';
import { CallWithERC2771Struct } from '@gelatonetwork/relay-sdk/dist/lib/erc2771/types';

@Entity('payment_request')
export class PaymentRequest extends BaseEntity {
  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.paymentRequests)
  brand: Brand;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  costAmountInToken: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  costAmountInDollar: number;

  @Column({
    nullable: true,
  })
  costCurrency: string;

  @Column({
    nullable: true,
  })
  tokenSymbol: string;

  @Column()
  costBatchId: string;

  @ManyToOne(() => CostBatch, (costBatch) => costBatch.paymentRequests)
  costBatch: CostBatch;

  @Column({ type: 'enum', enum: PaymentRequestTnxType })
  tnxType: PaymentRequestTnxType;

  @Column()
  narration: string;

  @Column({
    nullable: true,
  })
  sourceReference: string;

  @Column({
    default: false,
  })
  isCostPaid: boolean;

  @Column()
  network: supportedNetworks;

  @Column()
  relayerType: string;

  @Column('jsonb')
  data: CallWithERC2771Struct;

  @Column()
  signature: string;
}
