import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Req,
  ValidationPipe,
  Get,
  Query,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { LinkCardDto } from './dto/LinkCardDto.dto';
import { ApiTags } from '@nestjs/swagger';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { PaymentModuleService } from './service';
import { CreatePlanDto } from './dto/CreatePlanDto.dto';
import { SubscribeDto } from './dto/SubscribeDto.dto';
import { query } from 'express';
import { FilterInvoiceDto } from './dto/FilterInvoiceDto.dto';
import { PayInvoiceDto } from './dto/PayInvoiceDto.dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentModuleController {
  constructor(private readonly paymentService: PaymentModuleService) {}

  @UseGuards(BrandJwtStrategy)
  @Post('add-payment-method')
  async savePaymentMethodToWallet(
    @Body(ValidationPipe) body: LinkCardDto,
    @Req() req: any,
  ) {
    const brand = req.user.brand as Brand;

    return await this.paymentService.savePaymentMethodBrand(
      body.paymentMethodId,
      brand.id,
    );
  }

  @Post('plan')
  async createSubscription(
    @Body(ValidationPipe) body: CreatePlanDto,
    @Req() req: any,
  ) {
    return await this.paymentService.createSubscription(body);
  }

  @Get('plan')
  async getSubscriptionPlans(@Req() req: any) {
    return await this.paymentService.getSubscriptionPlans();
  }

  @UseGuards(BrandJwtStrategy)
  @Get('methods')
  async getPaymentMethods(@Req() req: any) {
    const brand = req.user.brand as Brand;

    return await this.paymentService.getPaymentMethods(brand.id);
  }

  @UseGuards(BrandJwtStrategy)
  @Post('plan/subscribe')
  async subscribeToPlan(
    @Body(ValidationPipe) body: SubscribeDto,
    @Req() req: any,
  ) {
    const brand = req.user.brand as Brand;
    body.brandId = brand.id;

    return await this.paymentService.subscribeToPlan(
      brand.id,
      body.planId,
      body.paymentMethodId,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Get('invoice')
  async getInvoices(
    @Req() req: any,

    @Query() query: FilterInvoiceDto,
  ) {
    const brand = req.user.brand as Brand;
    query.brandId = brand.id;

    return await this.paymentService.getInvoices(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Post('invoice/pay')
  async payInvoice(@Body(ValidationPipe) body: PayInvoiceDto, @Req() req: any) {
    const brand = req.user.brand as Brand;

    return await this.paymentService.payInvoice(
      body.invoiceId,
      brand.id,
      body.paymentMethodId,
    );
  }
}
