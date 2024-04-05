import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditTrailService } from '@src/globalServices/auditTrail/auditTrail.service';
import { AdminJwtStrategy } from '@src/middlewares/admin-jwt-strategy.middleware';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';

@ApiTags('Audit Trail')
@Controller('audit-trail')
@ApiBearerAuth()
export class AuditTrailController {
  constructor(private readonly auditTrailService: AuditTrailService) {}


  @UseGuards(AdminJwtStrategy)
  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.auditTrailService.findAll(pageNumber, limitNumber);
  }
}













