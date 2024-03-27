// bull.service.ts
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { OrderManagementService } from '@src/modules/storeManagement/order/service';
import { CustomerAccountManagementService } from '@src/modules/accountManagement/customerAccountManagement/service';
import { SettingsService } from '../settings/settings.service';
import {
  CAMPAIGN_REWARD_PROCESSOR_QUEUE,
  CAMPAIGN_REWARD_QUEUE,
  ORDER_PROCESSOR_QUEUE,
  ORDER_TASK_QUEUE,
  SET_CUSTOMER_WALLET_PROCESSOR_QUEUE,
  SET_CUSTOMER_WALLET_QUEUE,
} from '@src/utils/helpers/queue-names';
import {
  InjectQueue,
  OnWorkerEvent,
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { CampaignService } from '../campaign/campaign.service';

@Injectable()
export class BullService {
  constructor(
    @InjectQueue(ORDER_TASK_QUEUE)
    private readonly orderQueue: Queue,

    @InjectQueue(SET_CUSTOMER_WALLET_QUEUE)
    private readonly customerQueue: Queue,

    @InjectQueue(CAMPAIGN_REWARD_QUEUE)
    private readonly campaignQueue: Queue,
  ) {}

  async addOrderToQueue(orderId: string) {
    return await this.orderQueue.add(
      ORDER_PROCESSOR_QUEUE,
      { orderId },
      {
        attempts: 6, // Number of retry attempts
        backoff: {
          type: 'exponential', // Exponential backoff
          delay: 30000, // Initial delay before first retry in milliseconds
        },
        removeOnComplete: 1000,
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
    return await this.customerQueue.add(
      SET_CUSTOMER_WALLET_PROCESSOR_QUEUE,
      { userId, walletAddress },
      {
        attempts: 6, // Number of retry attempts
        backoff: {
          type: 'exponential', // Exponential backoff
          delay: 30000, // Initial delay before first retry in milliseconds
        },
        removeOnComplete: 1000,
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
    console.log('Adding campaign reward to queue');
    return await this.campaignQueue.add(
      CAMPAIGN_REWARD_PROCESSOR_QUEUE,
      { userId, brandId },
      {
        attempts: 6, // Number of retry attempts
        backoff: {
          type: 'exponential', // Exponential backoff
          delay: 30000, // Initial delay before first retry in milliseconds
        },
        removeOnComplete: 1000,
      },
    );
  }

  async getOrderJob(jobId: string) {
    return await this.orderQueue.getJob(jobId);
  }

  async pauseCampaignJob(jobId: string) {
    const job = await this.campaignQueue.getJob(jobId);
    if (job) {
      await job.retry();
    }
  }

  async getFailedCampaignJobs() {
    return await this.campaignQueue.getFailed();
  }

  async retryCampaignFailedJobs() {
    const failedJobs = await this.getFailedCampaignJobs();
    if (failedJobs.length > 0) {
      for (const job of failedJobs) {
        await job.retry();
      }
    }
  }
}

@Processor(ORDER_TASK_QUEUE)
export class OrderProcessor extends WorkerHost {
  constructor(
    @Inject(forwardRef(() => OrderManagementService))
    private readonly orderMgtService: OrderManagementService,
  ) {
    super();
  }

  async process(job: Job) {
    console.log('Processing order');
    await this.orderMgtService.checkOrderStatus(job.data.orderId);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    console.log('order completed');
  }
}

@Processor(SET_CUSTOMER_WALLET_QUEUE)
export class SetCustomerWalletProcessor extends WorkerHost {
  constructor(
    @Inject(forwardRef(() => CustomerAccountManagementService))
    private readonly customerMgtService: CustomerAccountManagementService,
    private readonly settingService: SettingsService,
  ) {
    super();
  }

  async process(job: Job) {
    const { walletAddress, userId } = job.data;
    const settings = await this.settingService.getPublicSettings();
    await this.customerMgtService.setWalletAddress(
      walletAddress,
      settings.walletVersion,
      userId,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    console.log('set wallet completed');
  }
}

@Processor(CAMPAIGN_REWARD_QUEUE)
export class CampaignProcessor extends WorkerHost {
  constructor(
    @Inject(forwardRef(() => CustomerAccountManagementService))
    private readonly customerMgtService: CustomerAccountManagementService,
    private readonly campaignService: CampaignService,
  ) {
    super();
  }

  async process(job: Job) {
    console.log('Processing campaign');
    const { userId, brandId } = job.data;

    const campaign = await this.campaignService.getBrandSignUpCampaign(brandId);

    if (campaign) {
      if (campaign.isUpdating) {
        // await this.bullService.pauseCampaignJob(job.id);
      } else {
        await this.customerMgtService.rewardForCampaign({
          userId,
          brandId,
        });
      }
    }
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    console.log('campaign completed');
  }
}
