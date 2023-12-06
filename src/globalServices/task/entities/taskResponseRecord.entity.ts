import { BaseEntity } from '@src/common/entities/base.entity';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Task } from './task.entity';
import { JobResponse } from './jobResponse.entity';

@Entity('task_response_record')
export class TaskResponseRecord extends BaseEntity {
  @Column()
  manifestUrl: string;

  @Column()
  manifestHash: string;

  @Column({
    nullable: true,
  })
  escrowAddress: string;

  @Column({
    nullable: true,
    default: false,
  })
  escrowUpdated: boolean;

  @Column({
    nullable: true,
    default: true,
  })
  isReady: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  isFunded: boolean;

  @Column()
  taskId: string;

  @OneToOne(() => Task, (task) => task.taskResponseRecord, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @OneToMany(() => JobResponse, (jobResponse) => jobResponse.taskRecord)
  jobResponses: JobResponse[];

  @Column()
  hmtJobId: string;
}
