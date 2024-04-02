import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditTrailService } from './auditTrail.service';
import { AuditTrail } from './entities/auditTrail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditTrail])],
  providers: [AuditTrailService],
  exports: [AuditTrailService],
})
export class AuditTrailModule {}
