import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('task_response')
export class TaskResponse extends BaseEntity {
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

  // @ManyToOne(() => TaskEntity, (task) => task.taskResponses)
  // @JoinColumn({ name: 'task_id' })
  // task: TaskEntity;

  // @ManyToOne(() => User, (user) => user.taskResponses)
  // @JoinColumn({ name: 'user_id' })
  // user: User;
}
