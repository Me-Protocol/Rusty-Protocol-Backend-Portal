import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditTrail } from './entities/auditTrail.entity';
import { CreateAuditTrailDto } from './dto/CreateAuditTrail.dto';

@Injectable()
export class AuditTrailService {
  constructor(
    @InjectRepository(AuditTrail)
    private auditTrailRepository: Repository<AuditTrail>,
  ) {}

  async createAuditTrail(
    createAuditTrailDto: CreateAuditTrailDto,
  ): Promise<AuditTrail> {
    const auditTrail = this.auditTrailRepository.create(createAuditTrailDto);
    return this.auditTrailRepository.save(auditTrail);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: AuditTrail[];
    total: number;
    nextPage: number | null;
    prevPage: number | null;
  }> {
    page = +page ?? 1;
    limit = +limit ?? 10;
    const [result, total] = await this.auditTrailRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    });

    const totalPages = Math.ceil(total / limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      data: result,
      total: total,
      nextPage,
      prevPage,
    };
  }
}
