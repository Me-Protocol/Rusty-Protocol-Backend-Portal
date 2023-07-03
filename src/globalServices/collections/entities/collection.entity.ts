// collection entity

import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/models/base.entity';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('collection')
export class Collection extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.collections)
  user: User;

  @Column({
    type: 'enum',
    enum: ItemStatus,
    default: ItemStatus.DRAFT,
  })
  status: ItemStatus;
}
