import { Injectable } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandSubServices } from '@src/utils/enums/BrandSubServices';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class BrandSubscriptionService {
  constructor(
    private readonly brandService: BrandService,
    private readonly settingsService: SettingsService,
  ) {}

  async getBrandServices(brandId: string) {
    const brand = await this.brandService.getBrandById(brandId);
    return brand.subscribedServices;
  }

  getServiceCost(service: BrandSubServices) {
    const { minimumBalanceApi, minimumBalanceInApp, topupLimitFactor } =
      this.settingsService.getCostSettings();

    const minimumBalanceForNextBatchApp =
      minimumBalanceInApp * topupLimitFactor;

    const minimumBalanceForNextBatchApi = minimumBalanceApi * topupLimitFactor;

    switch (service) {
      case BrandSubServices.IN_APP:
        return minimumBalanceForNextBatchApp;
      case BrandSubServices.API:
        return minimumBalanceForNextBatchApi;

      default:
        return 0;
    }
  }

  async getMaxServiceCost(brandId: string) {
    const costs = [];

    const brandServices = await this.getBrandServices(brandId);

    for (let index = 0; index < brandServices.length; index++) {
      const service = brandServices[index];
      costs.push(this.getServiceCost(service));
    }

    // return highest cost
    return Math.max(...costs);
  }
}
