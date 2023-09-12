import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostBatch } from './entities/costBatch.entity';
import { CostCollection } from './entities/costCollection';
import axios from 'axios';
import { logger } from '../logger/logger.service';

@Injectable()
export class CostModuleService {
  constructor(
    @InjectRepository(CostBatch)
    private readonly costBatchRepo: Repository<CostBatch>,

    @InjectRepository(CostCollection)
    private readonly costCollectionRepo: Repository<CostCollection>,
  ) {}

  async save(costBatch: CostBatch) {
    return await this.costBatchRepo.save(costBatch);
  }

  async getCostBatchById(id: string) {
    return await this.costBatchRepo.findOne({
      where: { id: id },
      relations: ['paymentRequests'],
    });
  }

  async getOrCreateActiveCostBatch() {
    const batch = await this.costBatchRepo.findOne({
      where: { isClosed: false },
    });

    if (batch) {
      return batch;
    }

    const newBatch = new CostBatch();

    return await this.costBatchRepo.save(newBatch);
  }

  async getSingleClosedCostBatch() {
    return await this.costBatchRepo.findOne({
      where: { isClosed: true, reimburserFailed: false },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getSingleFailedCostBatch() {
    return await this.costBatchRepo.findOne({
      where: { isClosed: true, reimburserFailed: true, isPaid: false },
    });
  }

  async saveCostCollection(costCollection: CostCollection) {
    return await this.costCollectionRepo.save(costCollection);
  }

  async checkTransactionStatusWithRetry({
    taskId,
  }: {
    taskId: string;
  }): Promise<string> {
    const apiUrl = process.env.GELATO_RELAYER_STATUS_URL + taskId;

    try {
      const response = await axios.get(apiUrl);
      const status = response.data.task.taskState;

      return status;
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to check transaction status.');
    }
  }
}
