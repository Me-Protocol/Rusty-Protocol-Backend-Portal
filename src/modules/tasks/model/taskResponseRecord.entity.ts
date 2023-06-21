import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { TaskEntity } from './tasks.entity';
import { AuditFields } from '@/config/inheritance.entity';
import { JobResponseEntity } from './jobResponse.entity';

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

  @OneToOne(() => TaskEntity, (task) => task.taskResponseRecord)
  @JoinColumn({ name: 'task_id' })
  task: TaskEntity;

  @OneToMany(() => JobResponseEntity, (jobResponse) => jobResponse.task_record)
  jobResponses: JobResponseEntity[];
}
