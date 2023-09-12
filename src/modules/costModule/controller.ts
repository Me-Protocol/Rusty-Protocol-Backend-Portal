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
import {
  PaymentRequestDto,
  PaymentRequestInAppDto,
} from './dto/PaymentRequestDto.dto';
import { InAppApiKeyJwtStrategy } from '@src/middlewares/inapp-api-jwt-strategy.middleware';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { SetAutoTopupAmountDto } from './dto/SetAutoTopupAmountDto.dto';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { ManualTopupDto } from './dto/ManualTopupDto.dto';
import { CostModuleService } from '@src/globalServices/costManagement/costModule.service';
import { ServerGuard } from '@src/middlewares/server-guard';

@ApiTags('Cost Module')
@UseInterceptors(ResponseInterceptor)
@Controller('cost')
export class CostManagementController {
  constructor(
    private readonly costModuleManagementService: CostModuleManagementService,
    private readonly costModuleService: CostModuleService,
  ) {}

  @UseGuards(ApiKeyJwtStrategy)
  @Post('/request')
  async createPaymentRequest(
    @Body(ValidationPipe) body: PaymentRequestDto,
    @Req() req: any,
  ) {
    const brandId = req.brand.id;
    body.brandId = brandId;

    return await this.costModuleManagementService.createPaymentRequestApi(body);
  }

  @UseGuards(InAppApiKeyJwtStrategy)
  @UseGuards(ServerGuard)
  @Post('/request/in-app')
  async createPaymentRequestInApp(
    @Body(ValidationPipe) body: PaymentRequestInAppDto,
  ) {
    return await this.costModuleManagementService.createPaymentRequestInApp(
      body,
    );
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Get('/request/check-status/:taskId')
  async checkStatus(@Req() req: any, @Param('taskId') taskId: string) {
    return await this.costModuleService.checkTransactionStatusWithRetry({
      taskId: taskId,
    });
  }

  @UseGuards(BrandJwtStrategy)
  @Post('/set-topup-amount')
  async setAutoTopUpAmount(
    @Req() req: any,
    @Body(ValidationPipe) body: SetAutoTopupAmountDto,
  ) {
    const brand = req.user.brand as Brand;

    return await this.costModuleManagementService.setAutoTopUpAmount(
      body.amount,
      brand,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Post('/manual-topup')
  async manualTopUp(
    @Req() req: any,
    @Body(ValidationPipe) body: ManualTopupDto,
  ) {
    const brand = req.user.brand as Brand;

    return await this.costModuleManagementService.manualTopUp(
      brand.id,
      body.amount,
    );
  }
}
