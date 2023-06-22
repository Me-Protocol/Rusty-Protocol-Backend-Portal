// base entity

import { BaseEntity as Base, Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity extends Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}

export abstract class AuditFields {
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  created_by: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  updated_by: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_deleted: boolean;
}
