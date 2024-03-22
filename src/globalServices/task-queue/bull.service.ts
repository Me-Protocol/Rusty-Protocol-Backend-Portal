// bull.service.ts
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { OrderManagementService } from '@src/modules/storeManagement/order/service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomerAccountManagementService } from '@src/modules/accountManagement/customerAccountManagement/service';
import { SettingsService } from '../settings/settings.service';
import { CampaignService } from '../campaign/campaign.service';
import {
  ORDER_PROCESSOR_QUEUE,
  ORDER_TASK_QUEUE,
} from '@src/utils/helpers/queue-names';

@Injectable()
export class BullService {
  constructor(
    @InjectQueue(ORDER_TASK_QUEUE) private readonly queue: Queue,

    @Inject(forwardRef(() => OrderManagementService))
    private readonly orderMgtService: OrderManagementService,
  ) {}

  async processOrder(orderId: string): Promise<void> {
    console.log('Processing order', orderId);
    await this.orderMgtService.checkOrderStatus(orderId);
  }

  async addOrderToQueue(orderId: string) {
    return await this.queue.add(
      'process-order',
      { orderId },
      {
        attempts: 6, // Number of retry attempts
        backoff: {
          type: 'exponential', // Exponential backoff
          delay: 30000, // Initial delay before first retry in milliseconds
        },
      },
    );
  }

  async setCustomerWalletAddressQueue({
    walletAddress,
    userId,
  }: {
    userId: string;
    walletAddress: string;
  }) {
    return await this.queue.add(
      'process-set-customer-wallet-address',
      { userId, walletAddress },
      {
        attempts: 6, // Number of retry attempts
        backoff: {
          type: 'exponential', // Exponential backoff
          delay: 30000, // Initial delay before first retry in milliseconds
        },
      },
    );
  }

  async addCampainRewardToQueue({
    userId,
    brandId,
  }: {
    userId: string;
    brandId: string;
  }) {
    return await this.queue.add(
      'process-campaign-reward',
      { userId, brandId },
      {
        attempts: 6, // Number of retry attempts
        backoff: {
          type: 'exponential', // Exponential backoff
          delay: 30000, // Initial delay before first retry in milliseconds
        },
      },
    );
  }

  async getJob(jobId: string) {
    return await this.queue.getJob(jobId);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async jobs() {
    const jobs = await this.queue.getJobs([
      'active',
      'waiting',
      'delayed',
      'failed',
    ]);
  }
}

@Processor(ORDER_PROCESSOR_QUEUE)
export class OrderProcessor {
  constructor(
    private readonly bullService: BullService,
    private readonly settingService: SettingsService,

    @Inject(forwardRef(() => CustomerAccountManagementService))
    private readonly customerAccountManagementService: CustomerAccountManagementService,

    private readonly campaignService: CampaignService,
  ) {}

  @Process('process-order')
  async processOrder(job: Job) {
    await this.bullService.processOrder(job.data.orderId);
  }

  @Process('process-set-customer-wallet-address')
  async redistribute(job: Job) {
    const { walletAddress, userId } = job.data;
    const settings = await this.settingService.getPublicSettings();
    await this.customerAccountManagementService.setWalletAddress(
      walletAddress,
      settings.walletVersion,
      userId,
    );
  }

  @Process('process-campaign-reward')
  async processCampaignReward(job: Job) {
    const { userId, brandId } = job.data;

    await this.customerAccountManagementService.rewardForCampaign({
      userId,
      brandId,
      jobId: job.id.toString(),
    });
  }
}
