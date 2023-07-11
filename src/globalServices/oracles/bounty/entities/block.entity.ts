import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('block')
export class Block extends BaseEntity {
  @Column()
  blockNumber: bigint;
}
