import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AllTaskTypes, TaskStatus } from '@src/utils/enums/TasksTypes';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { TaskResponse } from './taskResponse.entity';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { TaskResponseRecord } from './taskResponseRecord.entity';
import { ItemStatus } from '@src/utils/enums/ItemStatus';

@Entity('task')
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: AllTaskTypes })
  taskType: AllTaskTypes;

  // validation for task type
  @Column()
  validation: string;

  @Column()
  timeFrameInHours: number;

  @Column()
  numberOfWinners: number;

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
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column({ nullable: true })
  report: string;

  @Column()
  rewardId: string;

  @ManyToOne(() => Reward, (token) => token.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'rewardId' })
  reward: Reward;

  @OneToMany(() => TaskResponse, (taskResponse) => taskResponse.task, {
    onDelete: 'CASCADE',
  })
  taskResponses: TaskResponse[];

  @OneToOne(() => TaskResponseRecord, (taskResponse) => taskResponse.task, {
    onDelete: 'CASCADE',
  })
  taskResponseRecord: TaskResponseRecord;

  @Column({ nullable: true, default: false })
  notificationSent: boolean;

  @Column({ nullable: true })
  offerId: string;

  @ManyToOne(() => Offer, (offer) => offer.tasks)
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @Column({ nullable: true })
  tagPlatform: string;

  @Column({ nullable: true })
  socialHandle: string;

  @Column({ nullable: true })
  socialPost: string;

  @Column({ nullable: true })
  referralLink: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ nullable: true })
  shareUrl: string;

  @Column({
    nullable: true,
  })
  startDate: Date;

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
