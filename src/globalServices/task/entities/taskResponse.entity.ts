import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from '@src/globalServices/user/entities/user.entity';

@Entity('task_response')
export class TaskResponse extends BaseEntity {
  @Column({ nullable: false })
  response: string;

  @Column({ nullable: false })
  responseType: string;

  @Column({ nullable: true })
  responseUrl: string;

  @Column({ nullable: false })
  taskId: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  walletAddress: string;

  @ManyToOne(() => Task, (task) => task.taskResponses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @ManyToOne(() => User, (user) => user.taskResponses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
