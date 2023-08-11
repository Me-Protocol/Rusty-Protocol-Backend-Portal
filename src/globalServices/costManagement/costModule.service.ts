import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostBatch } from './entities/costBatch.entity';
import { CostCollection } from './entities/costCollection';

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
      where: { isClosed: true, reimburserFailed: true },
    });
  }

  async saveCostCollection(costCollection: CostCollection) {
    return await this.costCollectionRepo.save(costCollection);
  }
}
