import {
  Controller,
  Body,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  Post,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyJwtStrategy } from '@src/middlewares/api-jwt-strategy.middleware';
import { CostModuleManagementService } from './service';
import { PaymentRequestDto } from './dto/PaymentRequestDto.dto';

@ApiTags('Cost Module')
@UseInterceptors(ResponseInterceptor)
@Controller('cost')
export class CostManagementController {
  constructor(
    private readonly costModuleManagementService: CostModuleManagementService,
  ) {}

  @UseGuards(ApiKeyJwtStrategy)
  @Post('/request')
  async createPaymentRequest(
    @Body(ValidationPipe) body: PaymentRequestDto,
    @Req() req: any,
  ) {
    const brandId = req.brand.id;
    body.brandId = brandId;

    return await this.costModuleManagementService.createPaymentRequest(body);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Get('/request/check-status/:taskId')
  async checkStatus(@Req() req: any, @Param('taskId') taskId: string) {
    return await this.costModuleManagementService.checkTransactionStatusWithRetry(
      {
        taskId: taskId,
        attempt: 1,
      },
    );
  }
}
