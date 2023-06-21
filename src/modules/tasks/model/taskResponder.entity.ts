// task responder entity

import { AuditFields } from '@/config/inheritance.entity';
import { UserEntity } from '@modules/user/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './tasks.entity';

@Entity('task_responder')
export class TaskResponderEntity extends AuditFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  task_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true, default: false })
  winner: boolean;

  @Column({ nullable: true, default: false })
  task_performed: boolean;

  @Column({ nullable: true, default: false })
  task_cancelled: boolean;

  @Column({
    default: 1,
    nullable: true,
  })
  current_step: number;

  @ManyToOne(() => TaskEntity, (task) => task.taskResponses)
  @JoinColumn({ name: 'task_id' })
  task: TaskEntity;

  @ManyToOne(() => UserEntity, (user) => user.taskResponses)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
