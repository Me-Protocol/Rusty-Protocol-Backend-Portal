// customer entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('topup_event_block')
export class TopupEventBlock extends BaseEntity {
  @Column()
  lastBlock: number;
}
