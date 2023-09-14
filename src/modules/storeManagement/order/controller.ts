import {
  Controller,
  UseInterceptors,
  UseGuards,
  Post,
  Get,
  Req,
  Body,
  ValidationPipe,
  Query,
  Param,
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { OrderManagementService } from './service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from './dto/CreateOrderDto.dto';
import { FilterOrderDto } from './dto/FilterOrderDto.dto';
import { ApiKeyJwtStrategy } from '@src/middlewares/api-jwt-strategy.middleware';
import { UseCouponDto } from './dto/UseCouponDto.dto';
import { ServerGuard } from '@src/middlewares/server-guard';
import { InAppApiKeyJwtStrategy } from '@src/middlewares/inapp-api-jwt-strategy.middleware';
import { CompleteOrderDto } from './dto/CompleteOrderDto.dto';

@ApiTags('Order')
@UseInterceptors(ResponseInterceptor)
@Controller('order')
export class OrderManagementController {
  constructor(
    private readonly orderManagementService: OrderManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Post('redeem-offer')
  async redeem(@Req() req: any, @Body(ValidationPipe) body: CreateOrderDto) {
    const userId = req.user.id;
    body.userId = userId;

    return await this.orderManagementService.redeemWithRewardSpend(body);
  }

  @UseGuards(AuthGuard())
  @Get('/user')
  async getUserOrders(
    @Req() req: any,
    @Query(ValidationPipe) query: FilterOrderDto,
  ) {
    const userId = req.user.id;
    query.userId = userId;

    return await this.orderManagementService.getOrders(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('/brand')
  async getBranOrders(
    @Req() req: any,
    @Query(ValidationPipe) query: FilterOrderDto,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;

    return await this.orderManagementService.getOrders(query);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async getOrderById(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    const userId = req.user.id;

    return await this.orderManagementService.getOrderById(userId, id);
  }

  @UseGuards(AuthGuard())
  @Post('/mark-as-redeemed/:id')
  async markOrderAsRedeemed(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const userId = req.user.id;

    return await this.orderManagementService.markOrderAsRedeemed(userId, id);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Post('/use-coupon')
  @UseGuards(ServerGuard)
  async useCoupon(@Req() req: any, @Body(ValidationPipe) body: UseCouponDto) {
    const brandId = req.brand.id;
    body.brandId = brandId;

    return await this.orderManagementService.useCoupon(body);
  }

  @UseGuards(InAppApiKeyJwtStrategy)
  @UseGuards(ServerGuard)
  @Post('/complete')
  async completeOrder(
    @Req() req: any,
    @Body(ValidationPipe) body: CompleteOrderDto,
  ) {
    return await this.orderManagementService.completeOrder(
      body.orderId,
      body.taskId,
    );
  }

  @Get('/redeem/confirm-redeem-mock')
  async useCouponMock(
    @Req() req: any,
    @Query('code') code: string,
    @Res() res: any,
  ) {
    await this.orderManagementService.useCoupon({
      brandId: '50a90ee7-9870-42a9-91ba-cdda8917fa67',
      code,
      idOnBrandSite: '5f88662dbfd923434345',
    });

    // redirect to brand sites
    return res.redirect('http://localhost:3000/test?success=true');
  }
}
