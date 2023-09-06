// base entity

import { BaseEntity as Base, Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // soft delete columns

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
