// base entity

import {
  BaseEntity as Base,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
