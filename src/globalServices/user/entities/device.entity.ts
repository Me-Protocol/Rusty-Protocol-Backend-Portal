// device entity

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '@src/models/base.entity';

@Entity('device')
export class Device extends BaseEntity {
  @Column({
    nullable: true,
  })
  token: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  agent: string;

  @Column({
    nullable: true,
  })
  ip: string;

  @Column({
    nullable: true,
  })
  location: string;

  @Column({
    nullable: true,
  })
  type: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.devices)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    nullable: true,
  })
  device_token: string;
}
