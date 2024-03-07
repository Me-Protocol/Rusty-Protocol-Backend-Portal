// report entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('audit_trail')
export class AuditTrail extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  text: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  reportableId: string;
}
