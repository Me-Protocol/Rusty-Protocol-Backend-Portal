import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { AuditFields } from '@/config/inheritance.entity';
import { BrandEntity } from '@modules/brands/model/brand.entity';
import { TaskStatus, TaskType } from '@middleware/enums/task.enum';
import { TaskResponseEntity } from './taskResponse.entity';
import { TokenReward } from '@modules/tokenreward/models/tokenreward.entity';
import { TaskResponseRecord } from './taskResponseRecord.entity';
import { OffersEntity } from '@/modules/offers/model/offers.entity';

@Entity('tasks')
export class TaskEntity extends AuditFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskType })
  task_type: TaskType;

  // validation for task type
  @Column()
  validation: string;

  @Column()
  time_frame_in_hours: number;

  @Column()
  number_of_winners: number;

  @Column({ type: 'float' })
  price: number;

  @Column('text', { array: true })
  price_breakdown: string[];

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column()
  brand_id: number;

  @ManyToOne(() => BrandEntity, (brand) => brand.tasks)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @Column({ nullable: true })
  report: string;

  @Column()
  reward_token_id: string;

  @ManyToOne(() => TokenReward, (token) => token.tasks)
  @JoinColumn({ name: 'reward_token_id' })
  token: TokenReward;

  @OneToMany(() => TaskResponseEntity, (taskResponse) => taskResponse.task)
  taskResponses: TaskResponseEntity[];

  @OneToOne(() => TaskResponseRecord, (taskResponse) => taskResponse.task)
  taskResponseRecord: TaskResponseRecord;

  @Column({ nullable: true, default: false })
  notification_sent: boolean;

  @Column({ nullable: true })
  offer_id: number;

  @ManyToOne(() => OffersEntity, (offer) => offer.tasks)
  @JoinColumn({ name: 'offer_id' })
  offer: OffersEntity;

  @Column({ nullable: true })
  tag_platform: string;

  @Column({ nullable: true })
  social_handle: string;

  @Column({ nullable: true })
  social_post: string;

  @Column({ nullable: true })
  referral_link: string;

  @Column({ nullable: true })
  website_url: string;

  @Column({ nullable: true })
  share_url: string;

  @Column({
    nullable: true,
  })
  start_date: Date;

  @Column({
    nullable: true,
  })
  viewCount: number;

  @Column({
    nullable: true,
    default: 0,
  })
  winnerCount: number;

  @Column({
    nullable: true,
    default: false,
  })
  expired: boolean;
}
