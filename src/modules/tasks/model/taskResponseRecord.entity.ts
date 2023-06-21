import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { JobResponseEntity } from './jobResponse.entity';
import { AuditFields } from '@src/models/base.entity';
import { TaskDataEntity } from './tasks.entity';

@Entity()
export class TaskResponseRecord extends AuditFields {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => TaskDataEntity, (task) => task.taskResponseRecord)
  @JoinColumn({ name: 'task_id' })
  task: TaskDataEntity;

  @OneToMany(() => JobResponseEntity, (jobResponse) => jobResponse.task_record)
  jobResponses: JobResponseEntity[];
}
