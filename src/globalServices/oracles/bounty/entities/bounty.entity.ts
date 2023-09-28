import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bounty')
export class Bounty extends BaseEntity {
  @Column('bigint')
  lastestBlockNumber: string;
}
