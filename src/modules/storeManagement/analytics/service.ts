import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '@src/globalServices/analytics/analytics.service';
import { AnalyticsDto } from './analytics.dto';

@Injectable()
export class AnalyticsManagementService {
  constructor(private readonly analyticsService: AnalyticsService) {}

  async getAllBrandAnalytics(query: AnalyticsDto) {
    const analyticsObject = await Promise.all([
      this.analyticsService.getTotalNumberOfViews(query),
      this.analyticsService.getViewsPerDayByDateRange(query),
      this.analyticsService.getOrderFromBrandsReward(query),
      this.analyticsService.getOrderFromBrand(query),
      this.analyticsService.totalRewardSpentOnBrandOffers(query),
      this.analyticsService.totalRewardSpentOnOtherBrandOffers(query),
      this.analyticsService.totalBrandCustomers(query),
      this.analyticsService.brandFollowers(query),
    ]);

    return analyticsObject;
  }
}
