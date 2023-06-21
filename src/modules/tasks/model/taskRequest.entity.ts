import { UserEntity } from '@modules/user/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskDataEntity } from './tasks.entity';
import { AuditFields } from '@src/models/base.entity';

@Entity('task_request')
export class TaskRequest extends AuditFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  response: string;

  @Column({ nullable: false })
  response_type: string;

  @Column({ nullable: true })
  response_url: string;

  @Column({ nullable: false })
  task_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  wallet_address: string;

  @ManyToOne(() => TaskDataEntity, (task) => task.taskResponses)
  @JoinColumn({ name: 'task_id' })
  task: TaskDataEntity;

  @ManyToOne(() => UserEntity, (user) => user.taskResponses)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
