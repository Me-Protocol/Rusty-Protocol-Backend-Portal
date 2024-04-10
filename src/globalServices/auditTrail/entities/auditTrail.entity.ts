import { BaseEntity } from '@src/common/entities/base.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('audit_trail')
export class AuditTrail extends BaseEntity {
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.auditTrails)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  auditType: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  reportableId: string;
}
