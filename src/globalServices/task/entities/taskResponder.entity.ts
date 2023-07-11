import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from '@src/globalServices/user/entities/user.entity';

@Entity('task_responder')
export class TaskResponder extends BaseEntity {
  @Column({ nullable: false })
  taskId: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true, default: false })
  winner: boolean;

  @Column({ nullable: true, default: false })
  taskPerformed: boolean;

  @Column({ nullable: true, default: false })
  taskCancelled: boolean;

  @Column({
    default: 1,
    nullable: true,
  })
  currentStep: number;

  @ManyToOne(() => Task, (task) => task.taskResponses)
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @ManyToOne(() => User, (user) => user.taskResponses)
  @JoinColumn({ name: 'userId' })
  user: User;
}
