import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskResponseRecord } from './taskResponseRecord.entity';

@Entity('job_response')
export class JobResponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text', array: true })
  response: string[];

  @Column({ nullable: false })
  workerAddress: string;

  @Column({ nullable: false })
  escrowAddress: string;

  @Column({ nullable: false })
  task_record_id: number;

  @ManyToOne(
    () => TaskResponseRecord,
    (task_record) => task_record.jobResponses,
  )
  @JoinColumn({ name: 'task_record_id' })
  task_record: TaskResponseRecord;
}
