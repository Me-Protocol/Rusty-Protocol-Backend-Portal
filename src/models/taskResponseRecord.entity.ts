import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobResponse } from './jobResponse.entity';

@Entity('task_response_record')
export class TaskResponseRecord extends BaseEntity {
  @Column()
  manifest_url: string;

  @Column()
  manifest_hash: string;

  @Column({
    nullable: true,
  })
  escrow_address: string;

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
  task_id: number;

  // @OneToOne(() => TaskEntity, (task) => task.taskResponseRecord)
  // @JoinColumn({ name: 'task_id' })
  // task: TaskEntity;

  @OneToMany(() => JobResponse, (jobResponse) => jobResponse.task_record)
  jobResponses: JobResponse[];
}
