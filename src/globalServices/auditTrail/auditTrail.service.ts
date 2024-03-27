import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuditTrail } from "./entities/auditTrail.entity";
import { CreateAuditTrailDto } from "./dto/CreateAuditTrail.dto";

@Injectable()
export class AuditTrailService {
  constructor(
    @InjectRepository(AuditTrail)
    private auditTrailRepository: Repository<AuditTrail>,
  ) {}

  async createAuditTrail(createAuditTrailDto: CreateAuditTrailDto ): Promise<AuditTrail> {
    const auditTrail = this.auditTrailRepository.create(createAuditTrailDto);
    return this.auditTrailRepository.save(auditTrail);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: AuditTrail[]; total: number}> {
    const [result, total] = await this.auditTrailRepository.findAndCount({
      skip: (page -1) * limit,
      take: limit,
    });

    return {
      data: result,
      total: total,
    };
  }
}