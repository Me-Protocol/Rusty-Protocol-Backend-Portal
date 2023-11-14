import { AllTaskTypes, TaskStatus } from '@src/utils/enums/TasksTypes';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(AllTaskTypes, {
    message: 'Enter a valid task type',
  })
  task: AllTaskTypes;

  @IsString()
  validation: string;

  @IsNumber()
  time_frame_in_hours: number;

  @IsNumber()
  number_of_winners: number;

  @IsNumber()
  price: number;

  @IsArray()
  price_breakdown: string[];

  brand_id: string;

  @IsUUID()
  reward_token_id: string;

  @IsOptional()
  @IsUUID()
  offer_id: string;

  @IsOptional()
  @IsString()
  tag_platform: string;

  @IsOptional()
  @IsString()
  social_handle: string;

  @IsOptional()
  @IsString()
  social_post: string;

  @IsOptional()
  @IsString()
  referral_link: string;

  @IsOptional()
  @IsString()
  website_url: string;

  @IsOptional()
  @IsString()
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
  brand_id: string;
  reward_id: string;
  offer_id: string;
  tag_platform: string;
  social_handle: string;
  social_post: string;
  referral_link: string;
  website_url: string;
  share_url: string;
}

export class UpdateStatusDto {
  @IsEnum(TaskStatus, {
    message: 'Please enter a valid task status',
  })
  status: TaskStatus;
}

export class UpdateReportDto {
  report: string;
}

export class UpdateTaskResponseDto {
  @IsString()
  response: string;

  response_type: string;

  @IsString()
  response_url: string;

  @IsUUID()
  task_id: string;

  user_id: string;

  @IsString()
  wallet_address: string;
}

export class JoinTaskDto {
  @IsUUID()
  task_id: string;

  user_id: string;
}

export class JobResponseDto {
  escrow_address: string;
  worker_address: string;
  @IsArray()
  responses: string[];
}

export class FilterTaskDto {
  @IsNumberString()
  page: number;

  @IsNumberString()
  limit: number;

  @IsOptional()
  @IsEnum(AllTaskTypes, {
    message: 'Please enter a valid task type',
  })
  type: AllTaskTypes;

  @IsOptional()
  @IsObject()
  sort: {
    order: FindOptionsOrderValue;
    trending: boolean;
    minPrice: number;
    maxPrice: number;
    expiring: boolean;
  };

  @IsOptional()
  @IsUUID()
  brandId: string;

  @IsOptional()
  @IsString()
  rewardId: string;
}
