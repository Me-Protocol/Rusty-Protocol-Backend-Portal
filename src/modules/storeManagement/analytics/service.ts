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
      this.analyticsService.getBrandAnalytics(query),
      this.analyticsService.getTotalNumberOfActiveUsersBasedOnOrder(query),
    ]);

    return {
      totalNumberOfViews: analyticsObject[0],
      viewsPerDayByDateRange: analyticsObject[1],
      orderFromBrandsReward: analyticsObject[2],
      orderFromBrand: analyticsObject[3],
      totalRewardSpentOnBrandOffers: analyticsObject[4],
      totalRewardSpentOnOtherBrandOffers: analyticsObject[5],
      totalBrandCustomers: analyticsObject[6],
      brandFollowers: analyticsObject[7],
      totalActiveCustomersForBrand: analyticsObject[8].total_active_customers,
      totalPendingCustomersForBrand: analyticsObject[8].total_pending_customers,
      totalActiveUsersBasedOnOrder:
        analyticsObject[9].total_active_ordering_users,
    };
  }
}
