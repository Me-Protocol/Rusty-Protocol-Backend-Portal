import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  ValidationPipe,
  Get,
  Query,
  Param,
  Delete,
  HttpException,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LinkCardDto } from './dto/LinkCardDto.dto';
import { ApiTags } from '@nestjs/swagger';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { PaymentModuleService } from './service';
import { CreatePlanDto } from './dto/CreatePlanDto.dto';
import { SubscribeDto } from './dto/SubscribeDto.dto';
import { FilterInvoiceDto } from './dto/FilterInvoiceDto.dto';
import { PayInvoiceDto } from './dto/PayInvoiceDto.dto';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';
import { CurrencyService } from '@src/globalServices/currency/currency.service';
import { CreateVoucherDto } from './dto/CreateVoucherDto.dto';
import { ManualTopupDto } from '../costModule/dto/ManualTopupDto.dto';
import { AdminRoles } from '@src/decorators/admin_roles.decorator';
import { AdminRole } from '@src/utils/enums/AdminRole';
import { AdminJwtStrategy } from '@src/middlewares/admin-jwt-strategy.middleware';
import { IssueMeCreditsDto } from './dto/IssueMeCreditDto.dto';
import { CreateRegionDto } from './dto/CreateRegionDto.dto';
import { UpdateRegionDto } from './dto/UpdateRegionDto.dto';
import { CreateCurrencyDto } from './dto/CreateCurrencyDto.dto';
import { Currency } from '@src/globalServices/currency/entities/currency.entity';
import { RemoveMeCreditsDto } from './dto/RemoveMeCreditDto.dto';

@ApiTags('Payment')
@Controller('payment')
@ApiBearerAuth()
export class PaymentModuleController {
  constructor(
    private readonly paymentService: PaymentModuleService,
    private readonly currencyService: CurrencyService,
  ) {}

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
  @Delete('methods/:id')
  async deleteBrandPaymentMethod(
    @Req() req: any,
    @Param('id', ValidationPipe) id: string,
  ) {
    const brand = req.user.brand as Brand;

    return await this.paymentService.deleteBrandPaymentMethod(id, brand.id);
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
      body.useMeCredit,
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
      body.useMeCredit,
    );
  }

  //To track due invoices
  @UseGuards(AdminJwtStrategy)
  @Get('/admin/invoice/due')
  async getDueInvoices(
    @Query('brandId') brandId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string ='10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return await this.paymentService.getDueInvoices({
      brandId,
      page: pageNumber,
      limit: limitNumber,
  });
  }

  @Get('currencies')
  async getCurrency() {
    return await this.currencyService.getCurrency();
  }

  @UseGuards(AdminJwtStrategy)
  @Post('create-currencies')
  async createCurrency(
    @Body(ValidationPipe) createCurrencyDto: CreateCurrencyDto,
  ) {
    try {
      const currency = new Currency();
      currency.value = createCurrencyDto.value;
      currency.symbol = createCurrencyDto.symbol;
      currency.name = createCurrencyDto.name;
      currency.code = createCurrencyDto.code;

      return await this.currencyService.createCurrency(currency);
    } catch (error) {
      throw new HttpException(error.message, 400, {
        cause: new Error('createCurrencies'),
      });
    }
  }

  @UseGuards(AdminJwtStrategy)
  @Post('region')
  async createRegion(@Body(ValidationPipe) body: CreateRegionDto) {
    try {
      return await this.currencyService.createRegion(body);
    } catch (error) {
      throw new HttpException(error.message, 400, {
        cause: new Error('createRegion'),
      });
    }
  }

  @Get('region')
  async getRegions() {
    return await this.currencyService.getRegions();
  }

  @UseGuards(AdminJwtStrategy)
  @Put('region/:id')
  async updateRegion(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) body: UpdateRegionDto,
  ) {
    body.id = id;

    return await this.currencyService.updateRegion(body);
  }

  @Post('voucher')
  async createVoucher(@Body(ValidationPipe) body: CreateVoucherDto) {
    return await this.paymentService.createVouchers(body.vouchers);
  }

  @Get('voucher/:code')
  async getVoucherByCode(@Param('code', ValidationPipe) code: string) {
    return await this.paymentService.getVoucherByCode(code);
  }

  @UseGuards(BrandJwtStrategy)
  @Post('/brand-initial-onboarding')
  async manualTopUp(
    @Req() req: any,
    @Body(ValidationPipe) body: ManualTopupDto,
  ) {
    const brand = req.user.brand as Brand;
    body.brandId = brand.id;

    return await this.paymentService.brandInitialOnboarding(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('/me-credit-balance')
  async getMeCredits(@Req() req: any) {
    const brand = req.user.brand as Brand;

    return await this.paymentService.getMeCredits(brand.id);
  }

  @UseGuards(AdminJwtStrategy)
  @Get('/admin/me-credit-balance/:brandId')
  async getMeCreditsAdmin(@Param('brandId', ValidationPipe) brandId: string) {
    return await this.paymentService.getMeCredits(brandId);
  }

  @AdminRoles([AdminRole.SUPER_ADMIN])
  @UseGuards(AdminJwtStrategy)
  @Post('/admin/me-credit-balance')
  async issueMeCredits(
    @Body(ValidationPipe) body: IssueMeCreditsDto,
    @Req() req: any,
  ) {
    return await this.paymentService.issueMeCredits(body.brandId, body.amount);
  }

  //Remove unused credits
  @UseGuards(AdminJwtStrategy)
  @Post('/admin/remove-unused-credit')
  async RemoveMeCredits(
    @Body(ValidationPipe) body: RemoveMeCreditsDto,
    @Req() req: any,
  ) {
    return await this.paymentService.RemoveMeCredits(body.brandId, body.amount);
  }

  
}
