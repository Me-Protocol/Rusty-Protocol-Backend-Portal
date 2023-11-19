import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Offer } from '../offer/entities/offer.entity';
import { View } from '../views/entities/view.entity';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { Order } from '../order/entities/order.entity';
import { Reward } from '../reward/entities/reward.entity';
import { RewardRegistry } from '../reward/entities/registry.entity';
import { Task } from '../task/entities/task.entity';
import { BrandCustomer } from '../brand/entities/brand_customer.entity';
import { Follow } from '../follow/entities/follow.entity';

/**
 *
 *
 * @export
 * @class AnalyticsService
 * @description This service is used to generate analytics for the application
 * @method getActiveOffers() - This method is used to generate the api key
 */

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>,

    @InjectRepository(View)
    private readonly viewRepo: Repository<View>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Reward)
    private readonly rewardRepo: Repository<Reward>,

    @InjectRepository(RewardRegistry)
    private readonly rewardRegistryRepo: Repository<RewardRegistry>,

    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(BrandCustomer)
    private readonly brandCustomerRepo: Repository<BrandCustomer>,

    @InjectRepository(Follow)
    private readonly followRepo: Repository<Follow>,
  ) {}

  async getTotalNumberOfOffers({
    status,
    brandId,
  }: {
    status: ProductStatus;
    brandId: string;
  }): Promise<number> {
    return await this.offerRepo.count({
      where: {
        status,
        brandId,
      },
    });
  }

  async getTotalNumberOfViews({
    start,
    end,
    brandId,
  }: {
    start: Date;
    end: Date;
    brandId: string;
  }): Promise<number> {
    return await this.viewRepo.count({
      where: {
        createdAt: Between(start, end),
        offer: {
          brandId,
        },
      },
    });
  }

  async getTotalNumberOfViewsByOffer({
    start,
    end,
    offerId,
  }: {
    start: Date;
    end: Date;
    offerId: string;
  }): Promise<number> {
    return await this.viewRepo.count({
      where: {
        createdAt: Between(start, end),
        offer: {
          id: offerId,
        },
      },
    });
  }

  async getViewsPerDayByDateRange({
    start,
    end,
    brandId,
  }: {
    start: Date;
    end: Date;
    brandId: string;
  }): Promise<any> {
    const total = await this.viewRepo.count({
      where: {
        createdAt: Between(start, end),
        offer: {
          brandId,
        },
      },
    });

    const data = await this.viewRepo.find({
      where: {
        createdAt: Between(start, end),
        offer: {
          brandId,
        },
      },
      relations: ['offer'],
    });

    const viewsPerDay = {};
    data.forEach((view) => {
      const date = view.createdAt.toISOString().split('T')[0];
      if (viewsPerDay[date]) {
        viewsPerDay[date] += 1;
      } else {
        viewsPerDay[date] = 1;
      }
    });

    return {
      total,
      viewsPerDay,
      offers: data,
    };
  }

  async getOrderFromBrandsReward({
    brandId,
    start,
    end,
  }: {
    brandId: string;
    start: Date;
    end: Date;
  }) {
    const rewards = await this.rewardRepo.find({
      where: {
        brandId,
      },
    });

    const rewardIds = rewards.map((reward) => reward.id);

    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(start, end),
        offer: {
          rewardId: In(rewardIds),
        },
      },
    });

    const total = await this.orderRepo.count({
      where: {
        createdAt: Between(start, end),
        offer: {
          rewardId: In(rewardIds),
        },
      },
    });

    const ordersPerDay = {};
    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (ordersPerDay[date]) {
        ordersPerDay[date] += 1;
      } else {
        ordersPerDay[date] = 1;
      }
    });

    return {
      total,
      ordersPerDay,
      orders,
    };
  }

  async getOrderFromBrand({
    start,
    end,
    brandId,
  }: {
    start: Date;
    end: Date;
    brandId: string;
  }) {
    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(start, end),
        brandId,
      },
    });

    const total = await this.orderRepo.count({
      where: {
        createdAt: Between(start, end),
        brandId,
      },
    });

    const ordersPerDay = {};
    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (ordersPerDay[date]) {
        ordersPerDay[date] += 1;
      } else {
        ordersPerDay[date] = 1;
      }
    });

    return {
      total,
      ordersPerDay,
      orders,
    };
  }

  async totalRewardSpentOnBrandOffers({
    start,
    end,
    brandId,
  }: {
    start: Date;
    end: Date;
    brandId: string;
  }) {
    const rewards = await this.rewardRepo.find({
      where: {
        brandId,
      },
    });

    const rewardIds = rewards.map((reward) => reward.id);

    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(start, end),
        brandId: brandId,
        offer: {
          rewardId: In(rewardIds),
        },
      },
    });

    const total = await this.orderRepo.count({
      where: {
        createdAt: Between(start, end),
        offer: {
          rewardId: In(rewardIds),
        },
      },
    });

    const ordersPerDay = {};
    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (ordersPerDay[date]) {
        ordersPerDay[date] += 1;
      } else {
        ordersPerDay[date] = 1;
      }
    });

    const totalSum = orders.reduce((acc, order) => {
      return acc + order.points;
    }, 0);

    return {
      total,
      ordersPerDay,
      totalSum,
      orders,
    };
  }

  async totalRewardSpentOnOtherBrandOffers({
    start,
    end,
    brandId,
  }: {
    start: Date;
    end: Date;
    brandId: string;
  }) {
    const rewards = await this.rewardRepo.find({
      where: {
        brandId,
      },
    });

    const rewardIds = rewards.map((reward) => reward.id);

    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(start, end),
        offer: {
          rewardId: In(rewardIds),
        },
      },
    });

    const total = await this.orderRepo.count({
      where: {
        createdAt: Between(start, end),
        offer: {
          rewardId: In(rewardIds),
        },
      },
    });

    const ordersPerDay = {};
    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (ordersPerDay[date]) {
        ordersPerDay[date] += 1;
      } else {
        ordersPerDay[date] = 1;
      }
    });

    const totalSum = orders.reduce((acc, order) => {
      return acc + order.points;
    }, 0);

    return {
      total,
      ordersPerDay,
      totalSum,
      orders,
    };
  }

  async totalRewardIssuedToCustomers({ brandId }: { brandId: string }) {
    const registries = await this.rewardRegistryRepo.find({
      where: {
        reward: {
          brandId,
        },
      },
    });

    const totalIssued = registries.reduce((acc, registry) => {
      return acc + registry.totalBalance;
    }, 0);

    return totalIssued;
  }

  async totalActiveTasks({ brandId }: { brandId: string }) {
    const tasks = await this.taskRepo.count({
      where: {
        brandId,
      },
    });

    return tasks;
  }

  async totalBrandCustomers({
    start,
    end,
    brandId,
  }: {
    start: Date;
    end: Date;
    brandId: string;
  }) {
    const customers = await this.brandCustomerRepo.find({
      where: {
        createdAt: Between(start, end),
        brandId,
      },
    });

    const total = await this.brandCustomerRepo.count({
      where: {
        createdAt: Between(start, end),
        brandId,
      },
    });

    const customersPerDay = {};
    customers.forEach((customer) => {
      const date = customer.createdAt.toISOString().split('T')[0];
      if (customersPerDay[date]) {
        customersPerDay[date] += 1;
      } else {
        customersPerDay[date] = 1;
      }
    });

    return {
      total,
      customersPerDay,
      customers,
    };
  }

  async brandFollowers({
    start,
    end,
    brandId,
  }: {
    start: Date;
    end: Date;
    brandId: string;
  }) {
    const followers = await this.followRepo.find({
      where: {
        createdAt: Between(start, end),
        brandId,
      },
    });

    const total = await this.followRepo.count({
      where: {
        createdAt: Between(start, end),
        brandId,
      },
    });

    const followersPerDay = {};
    followers.forEach((follower) => {
      const date = follower.createdAt.toISOString().split('T')[0];
      if (followersPerDay[date]) {
        followersPerDay[date] += 1;
      } else {
        followersPerDay[date] = 1;
      }
    });

    return {
      total,
      followersPerDay,
      followers,
    };
  }
}
