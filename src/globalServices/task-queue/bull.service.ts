// bull.service.ts
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { OrderManagementService } from '@src/modules/storeManagement/order/service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomerAccountManagementService } from '@src/modules/accountManagement/customerAccountManagement/service';
import { SettingsService } from '../settings/settings.service';

export const ORDER_TASK_QUEUE = 'order-processing';
export const ORDER_PROCESSOR_QUEUE = 'order-processor';

@Injectable()
export class BullService {
  constructor(
    @InjectQueue(ORDER_TASK_QUEUE) private readonly queue: Queue,

    @Inject(forwardRef(() => OrderManagementService))
    private readonly orderMgtService: OrderManagementService,

    @Inject(forwardRef(() => CustomerAccountManagementService))
    private readonly customerAccountManagementService: CustomerAccountManagementService,

    private readonly settingService: SettingsService,
  ) {}

  async processOrder(orderId: string): Promise<void> {
    console.log('Processing order', orderId);
    await this.orderMgtService.checkOrderStatus(orderId);
  }

  async processSetCustomerWalletAddress({
    walletAddress,
    userId,
  }: {
    userId: string;
    walletAddress: string;
  }) {
    console.log('Processing set customer wallet address', userId);
    const settings = await this.settingService.getPublicSettings();

    await this.customerAccountManagementService.setWalletAddress(
      walletAddress,
      settings.walletVersion,
      userId,
    );
  }

  async processCampaignReward({
    userId,
    brandId,
  }: {
    userId: string;
    brandId: string;
  }) {
    console.log('Processing campaign reward');
    await this.customerAccountManagementService.rewardForCampaign({
      userId,
      brandId,
    });
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
    console.log(jobs.length, 'jobs found');
  }
}

@Processor(ORDER_PROCESSOR_QUEUE)
export class OrderProcessor {
  constructor(private readonly bullService: BullService) {}

  @Process('process-order')
  async processOrder(job: Job) {
    await this.bullService.processOrder(job.data.orderId);
  }

  @Process('process-set-customer-wallet-address')
  async redistribute(job: Job) {
    const { walletAddress, userId } = job.data;
    await this.bullService.processSetCustomerWalletAddress({
      walletAddress,
      userId,
    });
  }

  @Process('process-campaign-reward')
  async processCampaignReward(job: Job) {
    const { userId, brandId } = job.data;
    await this.bullService.processCampaignReward({ userId, brandId });
  }
}
