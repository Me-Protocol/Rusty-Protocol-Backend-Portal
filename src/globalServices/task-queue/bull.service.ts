// bull.service.ts
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { OrderManagementService } from '@src/modules/storeManagement/order/service';

export const ORDER_TASK_QUEUE = 'order-processing';
export const ORDER_PROCESSOR_QUEUE = 'order-processor';

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

  async addOrderToQueue(orderId: string): Promise<void> {
    console.log('Adding order to queue', orderId);
    await this.queue.add(
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
}

@Processor(ORDER_PROCESSOR_QUEUE)
export class OrderProcessor {
  constructor(private readonly bullService: BullService) {}

  @Process('process-order')
  async processOrder(job: Job) {
    await this.bullService.processOrder(job.data.orderId);
  }
}
