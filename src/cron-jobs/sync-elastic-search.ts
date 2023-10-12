import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { CategoryService } from '@src/globalServices/category/category.service';
import { OfferService } from '@src/globalServices/offer/offer.service';
import { RewardService } from '@src/globalServices/reward/reward.service';

@Injectable()
export class ElasticSearchCronService {
  constructor(
    private readonly brandsService: BrandService,
    private readonly offersService: OfferService,
    private readonly categoryService: CategoryService,
    private readonly rewardsService: RewardService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handleCron() {
    const syncBrandsIndex = await this.brandsService.syncElasticSearchIndex;
    const syncOffersIndex = await this.offersService.syncElasticSearchIndex;
    const syncCategoriesIndex = await this.categoryService
      .syncElasticSearchIndex;
    const syncRewardsIndex = await this.rewardsService.syncElasticSearchIndex;

    await Promise.all([
      syncBrandsIndex,
      syncOffersIndex,
      syncCategoriesIndex,
      syncRewardsIndex,
    ])
      .then((_results) => {
        console.timeLog('[ELASTIC_SEARCH', 'Elastic search indexing completed');
      })
      .catch((err) => {
        console.warn(
          '[ELASTIC_SEARCH',
          `Failed to sync indexes: ${JSON.stringify(err)}`,
        );
      });
  }
}
