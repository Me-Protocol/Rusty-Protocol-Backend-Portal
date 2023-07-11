import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TaskResponseRecord } from './taskResponseRecord.entity';
import { BaseEntity } from '@src/common/entities/base.entity';

@Entity('job_response')
export class JobResponse extends BaseEntity {
  @Column({ nullable: false, type: 'text', array: true })
  response: string[];

  @Column({ nullable: false })
  workerAddress: string;

  @Column({ nullable: false })
  escrowAddress: string;

  @Column({ nullable: false })
  taskRecordId: string;

  @ManyToOne(
    () => TaskResponseRecord,
    (task_record) => task_record.jobResponses,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'taskRecordId' })
  taskRecord: TaskResponseRecord;
}
