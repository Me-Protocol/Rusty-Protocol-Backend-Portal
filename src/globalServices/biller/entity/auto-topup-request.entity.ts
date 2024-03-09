// api_key entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { AutoTopupStatus } from '@src/utils/enums/AutoTopStatus';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity('auto_topup_request')
export class AutoTopupRequest extends BaseEntity {
  @Column()
  taskId: string;

  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.bills)
  brand: Brand;

  @Column('text')
  nounce: string;

  @Column('decimal')
  amount: number;

  @Column({
    default: AutoTopupStatus.PENDING,
    type: 'enum',
    enum: AutoTopupStatus,
  })
  status: AutoTopupStatus;

  @Column({
    default: 0,
  })
  retry: number;
}
