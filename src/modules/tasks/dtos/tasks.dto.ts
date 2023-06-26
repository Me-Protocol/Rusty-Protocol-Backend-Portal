import { AllTaskTypes, TaskStatus } from '@src/utils/enums/TasksTypes';
import { IsArray } from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

export class CreateTaskDto {
  title: string;
  description: string;
  task_type: AllTaskTypes;
  validation: string;
  time_frame_in_hours: number;
  number_of_winners: number;
  price: number;
  price_breakdown: string[];
  status: TaskStatus;
  brand_id: number;
  reward_token_id: string;
  offer_id: number;
  tag_platform: string;
  social_handle: string;
  social_post: string;
  referral_link: string;
  website_url: string;
  share_url: string;
}

export class UpdateTaskDto {
  title: string;
  description: string;
  task_type: AllTaskTypes;
  validation: string;
  time_frame_in_hours: number;
  number_of_winners: number;
  price: number;
  price_breakdown: string[];
  status: TaskStatus;
  brand_id: number;
  reward_id: number;
  offer_id: number;
  tag_platform: string;
  social_handle: string;
  social_post: string;
  referral_link: string;
  website_url: string;
  share_url: string;
}

export class UpdateStatusDto {
  status: TaskStatus;
}

export class UpdateReportDto {
  report: string;
}

export class UpdateTaskResponseDto {
  response: string;
  response_type: string;
  response_url: string;
  task_id: number;
  user_id: number;
  wallet_address: string;
}

export class JoinTaskDto {
  task_id: number;
  user_id: number;
}

export class JobResponseDto {
  escrow_address: string;
  worker_address: string;
  @IsArray()
  responses: string[];
}

export class FilterTaskDto {
  page: number;
  limit: number;
  type: AllTaskTypes;
  sort: {
    order: FindOptionsOrderValue;
    trending: boolean;
    minPrice: number;
    maxPrice: number;
    expiring: boolean;
  };
  brand: number;
  reward: string;
}
