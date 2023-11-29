import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsManagementService } from './service';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import {
  AnalyticsDto,
  RewardAnalyticsDto,
  RewardHoldersDto,
  RewardTransactionDto,
  TotalOfferDto,
  TotalOfferViewDto,
} from './analytics.dto';
import { AnalyticsService } from '@src/globalServices/analytics/analytics.service';

ApiTags('Analytics');
@Controller('store/analytics')
export class AnalyticsManagementController {
  constructor(
    private readonly analyticsManagementService: AnalyticsManagementService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @UseGuards(BrandJwtStrategy)
  @Get('all')
  async getAllBrandAnalytics(
    @Query(ValidationPipe) query: AnalyticsDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;

    return await this.analyticsManagementService.getAllBrandAnalytics(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('total-offers')
  async getTotalNumberOfOffers(
    @Query(ValidationPipe) query: TotalOfferDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;
    return this.analyticsService.getTotalNumberOfOffers(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('total-offers-views')
  async getTotalNumberOfViewsByOffer(
    @Query(ValidationPipe) query: TotalOfferViewDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;
    return this.analyticsService.getOfferViewsPerDayByDateRange(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('total-issued-rewards')
  async totalRewardIssuedToCustomers(
    @Query(ValidationPipe) query: TotalOfferViewDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;
    return this.analyticsService.totalRewardIssuedToCustomers(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('total-active-tasks')
  async totalActiveTasks(
    @Query(ValidationPipe) query: TotalOfferViewDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;
    return this.analyticsService.totalActiveTasks(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('review-analytics')
  async ratingAnalytics(
    @Query(ValidationPipe) query: TotalOfferViewDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;
    return this.analyticsService.ratingAnalytics({ brandId });
  }

  @UseGuards(BrandJwtStrategy)
  @Get('circular-supply')
  async getCirculatingSupply(
    @Query(ValidationPipe) query: RewardAnalyticsDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;
    return this.analyticsService.getCirculatingSupply(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('transactions')
  async getRewardTransactions(
    @Query(ValidationPipe) query: RewardTransactionDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;
    return this.analyticsService.getRewardTransactions(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('reward-holders')
  async getRewardHolders(
    @Query(ValidationPipe) query: RewardHoldersDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;
    return this.analyticsService.getRewardHolders(query);
  }
}
