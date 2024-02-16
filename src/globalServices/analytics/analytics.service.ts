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
import { Review } from '../review/entities/review.entity';
import { RewardCirculation } from './entities/reward_circulation';
import { RewardCirculationFilter } from '@src/utils/enums/RewardCirculationFilter';
import moment from 'moment';
import { Transaction } from '../fiatWallet/entities/transaction.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { Not } from '@node_modules/typeorm';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { UserAppType } from '@src/utils/enums/UserAppType';

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
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepo: Repository<Follow>,
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(RewardCirculation)
    private readonly rewardCirculationRepo: Repository<RewardCirculation>,
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async getTotalNumberOfActiveUsersBasedOnOrder({
    brandId,
    start,
    end,
  }: {
    brandId: string;
    start: Date;
    end: Date;
  }) {
    if (!start || !end) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      start = sevenDaysAgo;
      end = new Date();
    }

    const activeOrderingUsers = await this.orderRepo
      .createQueryBuilder('order')
      .select('DISTINCT order.userId', 'userId')
      .innerJoin('order.brand', 'brand')
      .innerJoin('order.offer', 'offer')
      .innerJoin('order.reward', 'reward')
      .where('order.createdAt BETWEEN :start AND :end', { start, end })
      // where reward.brandId = :brandId
      .andWhere('reward.brandId = :brandId', { brandId })
      .getRawMany();

    return {
      total_active_ordering_users: activeOrderingUsers.length,
    };
  }

  async getBrandAnalytics({
    brandId,
    start,
    end,
  }: {
    start?: Date;
    end?: Date;
    brandId: string;
  }) {
    const whereCondition: any = {
      brandId,
      identifierType: In([SyncIdentifierType.EMAIL, SyncIdentifierType.PHONE]),
    };

    if (start && end) {
      whereCondition.createdAt = Between(start, end);
    }

    const brandCustomers = await this.brandCustomerRepo.find({
      where: whereCondition,
      relations: ['brand'],
    });

    const identifiersByType: Record<SyncIdentifierType, string[]> = {
      [SyncIdentifierType.EMAIL]: [],
      [SyncIdentifierType.PHONE]: [],
    };

    // resolved possibility of null identifier from brandCustomers
    for (const brandCustomer of brandCustomers) {
      if (brandCustomer.identifierType && brandCustomer.identifier) {
        identifiersByType[brandCustomer.identifierType].push(
          brandCustomer.identifier,
        );
      }
    }

    const users: User[] = [];
    for (const identifierType in identifiersByType) {
      if (identifiersByType[identifierType].length > 0) {
        const usersOfType = await this.userRepo.find({
          where: {
            [identifierType]: In(identifiersByType[identifierType]),
            userType: UserAppType.USER,
          },
        });
        users.push(...usersOfType);
      }
    }

    const validIdentifiers = new Set(
      users.map((user) => (user.email ? user.email : user.phone)),
    );

    let totalActiveCustomers = 0;
    let totalNonActiveCustomers = 0;

    for (const brandCustomer of brandCustomers) {
      if (validIdentifiers.has(brandCustomer.identifier)) {
        totalActiveCustomers++;
      } else {
        totalNonActiveCustomers++;
      }
    }
    return {
      total_active_customers: totalActiveCustomers,
      total_pending_customers: totalNonActiveCustomers,
    };
  }

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

  async getOfferViewsPerDayByDateRange({
    start,
    end,
    offerId,
  }: {
    start: Date;
    end: Date;
    offerId: string;
  }) {
    const total = await this.viewRepo.count({
      where: {
        createdAt: Between(start, end),
        offer: {
          id: offerId,
        },
      },
    });

    const data = await this.viewRepo.find({
      where: {
        createdAt: Between(start, end),
        offer: {
          id: offerId,
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
        redeemRewardId: In(rewardIds),
      },
    });

    const total = await this.orderRepo.count({
      where: {
        createdAt: Between(start, end),
        redeemRewardId: In(rewardIds),
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
        redeemRewardId: In(rewardIds),
      },
    });

    const total = await this.orderRepo.count({
      where: {
        createdAt: Between(start, end),
        brandId,
        redeemRewardId: In(rewardIds),
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

    // const brandOffers = await this.offerRepo.find({
    //   where: {
    //     brandId,
    //   },
    // });

    // const brandOfferIds = brandOffers.map((offer) => offer.id);

    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(start, end),
        brandId: Not(brandId),
        redeemRewardId: In(rewardIds),
      },
    });

    const total = await this.orderRepo.count({
      where: {
        createdAt: Between(start, end),
        brandId: Not(brandId),
        redeemRewardId: In(rewardIds),
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

  async ratingAnalytics({ brandId }: { brandId: string }) {
    const allReviews = await this.reviewRepo.find({
      where: {
        brandId,
      },
    });

    const totalReviews = await this.reviewRepo.count({
      where: {
        brandId,
      },
    });

    const averageRating =
      allReviews.reduce((acc, review) => {
        return acc + review.rating;
      }, 0) / totalReviews;

    const ratingMetric = [5, 4, 3, 2, 1].map((rating) => {
      const count = allReviews.filter(
        (review) => review.rating === rating,
      ).length;
      return {
        rating,
        count,
      };
    });

    // diff between current month and last month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const lastMonthReviews = await this.reviewRepo.find({
      where: {
        brandId,
        createdAt: Between(
          new Date(lastYear, lastMonth, 1),
          new Date(currentYear, currentMonth, 1),
        ),
      },
    });

    const lastMonthAverageRating =
      lastMonthReviews.reduce((acc, review) => {
        return acc + review.rating;
      }, 0) / lastMonthReviews.length;

    const currentMonthReviews = await this.reviewRepo.find({
      where: {
        brandId,
        createdAt: Between(
          new Date(currentYear, currentMonth, 1),
          new Date(currentYear, currentMonth + 1, 1),
        ),
      },
    });

    const currentMonthAverageRating =
      currentMonthReviews.reduce((acc, review) => {
        return acc + review.rating;
      }, 0) / currentMonthReviews.length;

    // compare current month and last month rating (return the percentage difference and if its increasing or decreasing)

    const diff = currentMonthAverageRating - lastMonthAverageRating;
    const percentageDiff = (diff / lastMonthAverageRating) * 100;
    const isIncreasing = percentageDiff > 0;

    return {
      totalReviews,
      averageRating,
      ratingMetric,
      currentMonthAverageRating,
      lastMonthAverageRating,
      percentageDiff,
      isIncreasing,
    };
  }

  async getCirculatingSupply({
    brandId,
    rewardId,
    sortBy,
    start,
    end,
  }: {
    brandId: string;
    rewardId: string;
    sortBy: RewardCirculationFilter;
    start: Date;
    end: Date;
  }) {
    const rewardCirculations = await this.rewardCirculationRepo.find({
      where: {
        brandId,
        rewardId,
        createdAt: Between(start, end),
      },
    });

    const sortedRewardCirculations = {};

    if (sortBy === RewardCirculationFilter.FIVE_MINUES) {
      // sort all rewardCirculations within 5mins

      const fiveMinutes = rewardCirculations.filter((rewardCirculation) => {
        const now = moment();
        const createdAt = moment(rewardCirculation.createdAt);
        const diff = now.diff(createdAt, 'minutes');
        return diff <= 5;
      });

      sortedRewardCirculations[RewardCirculationFilter.FIVE_MINUES] =
        fiveMinutes;
    } else if (sortBy === RewardCirculationFilter.THIRTY_MINUTES) {
      // sort all rewardCirculations within 30mins

      const thirtyMinutes = rewardCirculations.filter((rewardCirculation) => {
        const now = moment();
        const createdAt = moment(rewardCirculation.createdAt);
        const diff = now.diff(createdAt, 'minutes');
        return diff <= 30;
      });

      sortedRewardCirculations[RewardCirculationFilter.THIRTY_MINUTES] =
        thirtyMinutes;
    } else if (sortBy === RewardCirculationFilter.ONE_HOUR) {
      // sort all rewardCirculations within 1 hour

      const oneHour = rewardCirculations.filter((rewardCirculation) => {
        const now = moment();
        const createdAt = moment(rewardCirculation.createdAt);
        const diff = now.diff(createdAt, 'minutes');
        return diff <= 60;
      });

      sortedRewardCirculations[RewardCirculationFilter.ONE_HOUR] = oneHour;
    } else if (sortBy === RewardCirculationFilter.ONE_DAY) {
      // sort all rewardCirculations within 1 day

      const oneDay = rewardCirculations.filter((rewardCirculation) => {
        const now = moment();
        const createdAt = moment(rewardCirculation.createdAt);
        const diff = now.diff(createdAt, 'days');
        return diff <= 1;
      });

      sortedRewardCirculations[RewardCirculationFilter.ONE_DAY] = oneDay;
    }

    console.log(rewardCirculations, 'Reward circulation');

    return { sortedRewardCirculations, rewardCirculations };
  }

  async getRewardTransactions({
    start,
    end,
    rewardId,
    brandId,
    page,
    limit,
  }: {
    start: Date;
    end: Date;
    rewardId: string;
    brandId: string;
    page: number;
    limit: number;
  }) {
    const transactions = await this.transactionRepo.find({
      where: {
        createdAt: Between(start, end),
        rewardId,
        reward: {
          brandId,
        },
      },

      skip: (+page - 1) * limit,
      take: limit,
    });

    const total = await this.transactionRepo.count({
      where: {
        createdAt: Between(start, end),
        rewardId,
        reward: {
          brandId,
        },
      },
    });

    return {
      transactions,
      total,
      nextPage: total > +page * limit ? Number(page) + 1 : null,
      previousPage: +page > 1 ? Number(page) - 1 : null,
    };
  }

  async getRewardHolders({
    rewardId,
    brandId,
  }: {
    rewardId: string;
    brandId: string;
  }) {
    const registries = await this.rewardRegistryRepo.find({
      where: {
        rewardId,
        hasBalance: true,
        reward: {
          brandId,
        },
      },
    });

    const total = await this.rewardRegistryRepo.count({
      where: {
        rewardId,
        hasBalance: true,
        reward: {
          brandId,
        },
      },
    });

    return {
      holders: registries,
      total,
    };
  }
}
