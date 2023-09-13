import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentRequest } from './entities/paymentRequest.entity';

@Injectable()
export class PaymentRequestService {
  constructor(
    @InjectRepository(PaymentRequest)
    private readonly paymentRequestRepo: Repository<PaymentRequest>,
  ) {}

  save(request: PaymentRequest) {
    return this.paymentRequestRepo.save(request);
  }

  async getPaymentRequests(brandId: string, page: number, limit = 10) {
    const requests = await this.paymentRequestRepo.find({
      where: { brandId: brandId },
      skip: +page === 1 ? 0 : (+page - 1) * limit,
      take: limit ? limit : 10,
    });

    const count = await this.paymentRequestRepo.count({
      where: { brandId: brandId },
    });

    const pagination = {
      currentPage: page,
      limit: limit,
      totalPage: Math.ceil(count / limit),
      nextPage: Math.ceil(count / limit) > page ? Number(page) + 1 : null,
      previousPage: page === 1 ? null : Number(page) - 1,
    };

    return { requests, pagination };
  }

  async getCostBatchPaymentRequests(batchId: string) {
    return await this.paymentRequestRepo.find({
      where: { costBatchId: batchId, isCostPaid: false },
    });
  }
}
