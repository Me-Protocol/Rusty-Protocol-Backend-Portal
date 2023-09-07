// base entity

import {
  BaseEntity as Base,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @DeleteDateColumn()
  @Column({ nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Column()
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Column()
  updatedAt!: Date;
}
