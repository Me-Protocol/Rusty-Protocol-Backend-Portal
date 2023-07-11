import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('bountyrecord')
export class BountyRecord extends BaseEntity {
  @Column({
    type: 'boolean',
    default: false,
  })
  expired: boolean;

  @Column()
  contractAddress: string;
}
