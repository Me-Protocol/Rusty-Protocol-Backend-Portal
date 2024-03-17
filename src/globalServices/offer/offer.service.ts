import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { UserService } from '../user/user.service';
import { ItemStatus, ProductStatus } from '@src/utils/enums/ItemStatus';
import { ProductImage } from '../product/entities/productImage.entity';
import { ViewsService } from '../views/view.service';
import { OfferFilter, OfferSort } from '@src/utils/enums/OfferFiilter';
import { CustomerService } from '../customer/customer.service';
import { ProductService } from '../product/product.service';
import { Order } from '../order/entities/order.entity';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { offerIndex } from '@src/modules/search/interface/search.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BrandCustomer } from '../brand/entities/brand_customer.entity';
import { User } from '../user/entities/user.entity';
import { CurrencyService } from '../currency/currency.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>,
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
    @InjectRepository(BrandCustomer)
    private readonly brandCustomerRepo: Repository<BrandCustomer>,
    private readonly userService: UserService,
    private readonly viewService: ViewsService,
    private readonly customerService: CustomerService,
    private readonly productService: ProductService,
    private readonly elasticIndex: ElasticIndex,
    private readonly currencyService: CurrencyService,

    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}

  async saveOffer(offer: Offer) {
    return await this.offerRepo.save(offer);
  }

  async updateOffer(offer: Offer) {
    return await this.offerRepo.update(
      {
        id: offer.id,
      },
      offer,
    );
  }

  async updateOfferViews(offerId: string) {
    const offer = await this.offerRepo.findOne({
      where: {
        id: offerId,
      },
    });

    return this.offerRepo.update(
      {
        id: offerId,
      },
      {
        viewCount: offer.viewCount + 1,
      },
    );
  }

  async updateOfferLikeCount(offerId: string) {
    const offer = await this.offerRepo.findOne({
      where: {
        id: offerId,
      },
    });

    return this.offerRepo.update(
      {
        id: offerId,
      },
      {
        likeCount: offer.likeCount + 1,
      },
    );
  }

  async getOfferById(id: string) {
    return await this.offerRepo.findOne({
      where: {
        id,
      },
      relations: [
        'brand',
        'product',
        'product.category',
        'product.subCategory',
        'product.variants',
        'offerImages',
        'reward',
      ],
    });
  }

  async getBrandOfferById(id: string, brandId: string) {
    return await this.offerRepo.findOne({
      where: {
        id,
        brandId,
      },
      relations: [
        'brand',
        'product',
        'product.category',
        'product.variants',
        'product.variants.options',
        'product.subCategory',
        'offerImages',
        'reward',
      ],
    });
  }

  async getBrandOfferByIdWithoutRelations(id: string, brandId: string) {
    return await this.offerRepo.findOne({
      where: {
        id,
        brandId,
      },
    });
  }

  async getOfferByofferCode(
    offerCode: string,
    sessionId: string,
    userId?: string,
  ) {
    let user: User;

    if (userId) {
      user = await this.userService.getUserById(userId);
    }

    const offer = await this.offerRepo.findOne({
      where: {
        offerCode,
        status: ProductStatus.PUBLISHED,
      },
      relations: [
        'brand',
        'product',
        'product.category',
        'product.variants',
        'product.variants.options',
        'product.subCategory',
        'product.variants',
        'offerImages',
        'reward',
        'product.currency',
      ],
    });

    if (!offer) {
      throw new Error('Offer not found');
    }

    await this.viewService.createView(offer.id, sessionId, userId);

    return offer;
  }

  async getOfferForLoggedInUser(
    userId: string,
    offerCode: string,
    sessionId: string,
  ): Promise<Offer> {
    const offer = await this.getOfferByofferCode(offerCode, sessionId, userId);

    if (!offer) {
      throw new Error('Offer not found');
    }

    // push category to user
    if (offer?.product?.category?.id) {
      await this.userService.updateUserCategoryInterests(
        userId,
        offer?.product?.category?.id,
      );
    }

    return offer;
  }

  async getOfferByRewardId({
    rewardId,
    page,
    limit,
  }: {
    rewardId: string;
    page: number;
    limit: number;
  }) {
    const offersQuery = this.offerRepo
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('variants.options', 'options')
      .leftJoinAndSelect('product.subCategory', 'subCategory')
      .leftJoinAndSelect('offer.offerImages', 'offerImages')
      .leftJoinAndSelect('offer.brand', 'brand')
      .leftJoinAndSelect('product.currency', 'currency')
      .leftJoinAndSelect('offer.reward', 'reward')
      .where('offer.status = :status', { status: ItemStatus.PUBLISHED })
      .andWhere('offer.rewardId = :rewardId', { rewardId });

    offersQuery.skip((page - 1) * limit);
    offersQuery.take(limit);

    const offers = await offersQuery.getMany();
    const total = await offersQuery.getCount();

    return {
      offers,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async getOffers({
    page,
    limit,
    category,
    subCategory,
    brandId,
    sort,
    regionId,
  }: {
    page: number;
    limit: number;
    category?: string;
    subCategory?: string;
    brandId?: string;
    sort: OfferSort;
    regionId: string;
  }) {
    const offersQuery = this.offerRepo
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('variants.options', 'options')
      .leftJoinAndSelect('product.regions', 'regions')
      .leftJoinAndSelect('product.subCategory', 'subCategory')
      .leftJoinAndSelect('offer.offerImages', 'offerImages')
      .leftJoinAndSelect('offer.brand', 'brand')
      .leftJoinAndSelect('offer.reward', 'reward')
      .leftJoinAndSelect('product.currency', 'currency')
      .where('offer.status = :status', { status: ItemStatus.PUBLISHED })
      // brand.listOnStore is used to check if brand is active
      .andWhere('brand.listOnStore = :listOnStore', { listOnStore: true })
      .andWhere('brand.disabled = :disabled', {
        disabled: false,
      });

    if (category) {
      offersQuery
        .andWhere('product.categoryId = :categoryId', {
          categoryId: category,
        })
        .andWhere('offer.status = :status', { status: ItemStatus.PUBLISHED });
    }

    if (subCategory) {
      offersQuery
        .andWhere('product.subCategoryId = :subCategoryId', {
          subCategoryId: subCategory,
        })
        .andWhere('offer.status = :status', { status: ItemStatus.PUBLISHED });
    }

    if (brandId) {
      offersQuery
        .andWhere('offer.brandId = :brandId', { brandId })
        .andWhere('offer.status = :status', { status: ItemStatus.PUBLISHED });
    }

    if (sort === OfferSort.TRENDING) {
      offersQuery
        .andWhere('offer.viewCount > :viewCount', {
          viewCount: 3, // TODO: Change this to 100,
        })
        .andWhere('offer.status = :status', { status: ItemStatus.PUBLISHED });
      // offersQuery.andWhere('offer.likeCount > :likeCount', {
      //   likeCount: 2, // TODO: Change this to 100,
      // });
      offersQuery.orderBy('offer.updatedAt', 'DESC');
    }

    if (sort === OfferSort.POPULAR) {
      offersQuery.orderBy('offer.viewCount', 'DESC');
      offersQuery.addOrderBy('offer.likeCount', 'DESC');
    }

    if (sort === OfferSort.NEW) {
      offersQuery.orderBy('offer.createdAt', 'DESC');
    }

    if (sort === OfferSort.PRICE_HIGH_TO_LOW) {
      offersQuery.orderBy('offer.tokens', 'DESC');
    }

    if (sort === OfferSort.PRICE_LOW_TO_HIGH) {
      offersQuery.orderBy('offer.tokens', 'ASC');
    }

    if (sort === OfferSort.EXPIRING) {
      offersQuery
        .andWhere('offer.endDate > :endDate', {
          endDate: new Date(),
        })
        .andWhere('offer.status = :status', { status: ItemStatus.PUBLISHED });
      offersQuery.orderBy('offer.endDate', 'ASC');
    }

    if (regionId) {
      const checkRegion = await this.currencyService.getRegionById(regionId);

      if (!checkRegion) {
        throw new Error('Region not found');
      }

      // where offer product regions contains regionId or offer product regions is empty
      offersQuery
        .andWhere('regions.id = :regionId', { regionId })
        .andWhere('offer.status = :status', { status: ItemStatus.PUBLISHED });
    } else {
      offersQuery
        .orWhere('regions.id IS NULL')
        .andWhere('offer.status = :status', { status: ItemStatus.PUBLISHED });
    }

    const defaultRegion = await this.currencyService.getDefaultRegion();

    offersQuery
      .andWhere('regions.id = :regionId', {
        regionId: defaultRegion.id,
      })
      .andWhere('offer.status = :status', { status: ItemStatus.PUBLISHED });

    offersQuery.skip((page - 1) * limit);
    offersQuery.take(limit);

    const offers = await offersQuery.getMany();
    const total = await offersQuery.getCount();

    return {
      offers,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async getTopOffersForUser(
    page: number,
    limit: number,
    userId: string,
    regionId: string,
  ) {
    // Get user interests
    const interests = await this.userService.getUserCategoryInterests(userId);

    // Check if user has any interests
    if (interests.length === 0) {
      // Get trending offers if user has no interests

      const trendingOffers = await this.offerRepo.find({
        where: {
          status: ProductStatus.PUBLISHED,
          updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
          brand: {
            listOnStore: true,
            disabled: false,
          },
          //  if regionId is present, get offers for that region
          //  else get offers for default region
          product: regionId
            ? {
                regions: {
                  id: regionId,
                },
              }
            : {
                regions: {
                  isDefault: true,
                },
              },
        },
        take: 10,
        order: {
          likeCount: 'DESC',
          viewCount: 'DESC',
        },
      });

      // Get offer product categories and subcategories

      const categories = trendingOffers.map(
        (offer) => offer.product.categoryId,
      );
      const subCategories = trendingOffers.map(
        (offer) => offer.product.subCategoryId,
      );

      // Get offers based on categories and subcategories

      const offers = await this.offerRepo.find({
        where: {
          status: ProductStatus.PUBLISHED,
          product: regionId
            ? {
                regions: {
                  id: regionId,
                },
                categoryId: In(categories),
                subCategoryId: In(subCategories),
              }
            : {
                regions: {
                  isDefault: true,
                },
                categoryId: In(categories),
                subCategoryId: In(subCategories),
              },
        },
        skip: (page - 1) * limit,
        take: limit,
        relations: [
          'brand',
          'product',
          'product.category',
          'product.variants',
          'product.variants.options',
          'product.subCategory',
          'product.variants',
          'product.currency',
          'offerImages',
          'reward',
        ],
        order: {
          likeCount: 'DESC',
          viewCount: 'DESC',
        },
      });

      const total = await this.offerRepo.count({
        where: {
          status: ProductStatus.PUBLISHED,
          product: {},
        },
      });

      return {
        offers,
        total,
        nextPage: total > page * limit ? Number(page) + 1 : null,
        previousPage: page > 1 ? Number(page) - 1 : null,
      };
    } else {
      // Get offers based on users first interest
      const offers = await this.offerRepo.find({
        where: {
          status: ProductStatus.PUBLISHED,
          product: regionId
            ? {
                regions: {
                  id: regionId,
                },
                category: {
                  id: In(interests),
                },
              }
            : {
                regions: {
                  isDefault: true,
                },
                category: {
                  id: In(interests),
                },
              },
          brand: {
            listOnStore: true,
            disabled: false,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        relations: [
          'brand',
          'product',
          'product.category',
          'product.variants',
          'product.variants.options',
          'product.subCategory',
          'product.variants',
          'product.currency',
          'offerImages',
          'reward',
        ],
        order: {
          likeCount: 'DESC',
          viewCount: 'DESC',
        },
      });

      const total = await this.offerRepo.count({
        where: {
          status: ProductStatus.PUBLISHED,
          product: {
            category: {
              id: In(interests),
            },
          },
        },
      });

      return {
        offers,
        total,
        nextPage: total > page * limit ? Number(page) + 1 : null,
        previousPage: page > 1 ? Number(page) - 1 : null,
      };
    }
  }

  async getBrandOffers(
    page: number,
    limit: number,
    brandId: string,
    status: ProductStatus,
    orderBy: OfferFilter,
    order: string,
    search: string,
    productId?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const offersQuery = this.offerRepo
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.subCategory', 'subCategory')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('variants.options', 'options')
      .leftJoinAndSelect('offer.offerImages', 'offerImages')
      .leftJoinAndSelect('offer.brand', 'brand')
      .leftJoinAndSelect('offer.reward', 'reward')
      .leftJoinAndSelect('product.currency', 'currency')
      .where('offer.brandId = :brandId', { brandId });

    if (status) {
      offersQuery.andWhere('offer.status = :status', { status });
    }

    if (orderBy === OfferFilter.MOST_SALES) {
      offersQuery.andWhere('offer.totalOrders > :totalOrders', {
        totalOrders: 4, // TODO: Change this to 100,,
      });
      offersQuery.orderBy('offer.totalOrders', 'DESC');
    }

    if (orderBy === OfferFilter.MOST_VIEWED) {
      offersQuery.andWhere('offer.viewCount > :viewCount', {
        viewCount: 10, // TODO: Change this to 100,
      });
      offersQuery.orderBy('offer.viewCount', 'DESC');
    }

    if (orderBy === OfferFilter.MOST_RECENT) {
      // where createdAt is less than 7 days
      offersQuery.andWhere('offer.createdAt > :createdAt', {
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
      });
      offersQuery.orderBy('offer.createdAt', 'DESC');
    }

    if (orderBy === OfferFilter.LOW_IN_STOCK) {
      //  where offer product stock is less than 10
      offersQuery.andWhere('product.inventory < :inventory', {
        stock: 10,
      });
      offersQuery.orderBy('product.inventory', 'ASC');
    }

    if (search) {
      offersQuery.andWhere('offer.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (productId) {
      offersQuery.andWhere('offer.productId = :productId', {
        productId,
      });
    }

    if (startDate && endDate) {
      offersQuery.andWhere('offer.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    if (order) {
      const formatedOrder = order.split(':')[0];
      const acceptedOrder = [
        'status',
        'originalPrice',
        'discountPercentage',
        'tokens',
        'offerCode',
        'name',
        'description',
        'viewCount',
        'likeCount',
        'shareCount',
        'commentCount',
        'startDate',
        'endDate',
        'idOnBrandsite',
        'totalSales',
        'totalOrders',
        'createdAt',
        'updatedAt',
      ];
      if (!acceptedOrder.includes(formatedOrder)) {
        throw new Error('Invalid order param');
      }

      offersQuery.orderBy(
        `offer.${order.split(':')[0]}`,
        order.split(':')[1] === 'ASC' ? 'ASC' : 'DESC',
      );
    }

    offersQuery.skip((page - 1) * limit);
    offersQuery.take(limit);

    const offers = await offersQuery.getMany();
    const total = await offersQuery.getCount();

    return {
      offers,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async bulkAddOfferImage(brandId: string, offerId: string, images: string[]) {
    const offer = await this.offerRepo.findOne({
      where: {
        id: offerId,
        brandId,
      },
      relations: ['offerImages'],
    });
    if (!offer) {
      throw new Error('Offer not found');
    }

    const productImages = [];

    for (const image of images) {
      // check if image already exists
      const existingImage = offer.offerImages.find(
        (offerImage) => offerImage.url === image,
      );

      if (!existingImage) {
        productImages.push(
          this.productImageRepo.create({
            url: image,
            offer,
          }),
        );
      }
    }

    return this.productImageRepo.save(productImages);
  }

  async generateOfferCode(name: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // get caps from name
    const caps = name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');

    const codeWithCaps = `${code}_${caps}`;

    const offer = await this.offerRepo.findOne({
      where: {
        offerCode: codeWithCaps,
      },
    });

    if (offer) {
      return this.generateOfferCode(name);
    }

    return codeWithCaps;
  }

  async deleteOffer(offerId: string, brandId: string) {
    return await this.offerRepo.softDelete({
      id: offerId,
      brandId,
    });
  }

  async increaseOfferSales({
    offer,
    userId,
  }: {
    offer: Offer;
    userId: string;
  }) {
    try {
      const successOrders =
        await this.orderService.getSuccessfulOrdersByOfferId(offer.id);

      const totalSales = successOrders.reduce((acc, order) => {
        return Number(acc) + Number(order?.offer?.product?.price ?? 0);
      }, 0);
      const totalSalesParse = totalSales.toFixed(2);

      offer.totalOrders = successOrders.length;
      offer.totalSales = +totalSalesParse;

      // update customer total redeem
      const customer = await this.customerService.getByUserId(userId);

      const userSuccessfulOrders =
        await this.orderService.getSuccessfulOrdersByUserId(userId);

      const totalRedemptionAmount = userSuccessfulOrders.reduce(
        (acc, order) => {
          return Number(acc) + Number(order?.offer?.product?.price ?? 0);
        },
        0,
      );
      const totalRedemptionAmountParse = totalRedemptionAmount.toFixed(3);

      customer.totalRedeemed = userSuccessfulOrders.length;
      customer.totalRedemptionAmount = +totalRedemptionAmountParse;

      const brandCustomer = await this.brandCustomerRepo.findOne({
        where: { userId: userId, brandId: offer.brandId },
      });

      if (brandCustomer) {
        brandCustomer.totalRedeemed = userSuccessfulOrders.length;
        brandCustomer.totalRedemptionAmount = +totalRedemptionAmountParse;

        await this.brandCustomerRepo.save(brandCustomer);
      }

      await this.offerRepo.save(offer);

      await this.customerService.save(customer);

      return 'done';
    } catch (error) {
      console.log(error);
    }
  }

  async reduceInventory(offer: Offer, order: Order) {
    offer.inventory = Number(offer.inventory) - Number(order.quantity);
    await this.offerRepo.save(offer);
  }

  async increaseInventory(offer: Offer, order: Order) {
    offer.inventory = Number(offer.inventory) + Number(order.quantity);

    await this.offerRepo.save(offer);
  }

  // @Cron(CronExpression.EVERY_5_MINUTES)
  // async syncElasticSearchIndex() {
  //   //const currentDate = new Date();

  //   const offersQuery = this.offerRepo
  //     .createQueryBuilder('offer')
  //     //.where('offer.endDate < :currentDate', { currentDate })
  //     .where('offer.status = :status', { status: ProductStatus.PUBLISHED })
  //     .leftJoinAndSelect('offer.product', 'product')
  //     .leftJoinAndSelect('product.category', 'category')
  //     .leftJoinAndSelect('product.subCategory', 'subCategory')
  //     .leftJoinAndSelect('offer.offerImages', 'offerImages')
  //     .leftJoinAndSelect('offer.brand', 'brand')
  //     .leftJoinAndSelect('offer.reward', 'reward');

  //   const allOffers = await offersQuery.getMany();
  //   this.elasticIndex.batchCreateIndex(allOffers, offerIndex);
  // }

  // get offers where the end date has passed and the status is expired
  // TODO: We might need to change the cron expression to run every 5 minutes
  @Cron(CronExpression.EVERY_5_MINUTES)
  async updateOfferStatus() {
    const offers = await this.offerRepo.find({
      where: {
        endDate: LessThan(new Date()),
        status: ProductStatus.PUBLISHED,
      },
    });

    for (const offer of offers) {
      this.elasticIndex.deleteDocument(offerIndex, offer.id);
      offer.status = ProductStatus.EXPIRED;
      await this.offerRepo.save(offer);
    }
  }

  async deleteOffersByProductId(productId: string) {
    return await this.offerRepo.softDelete({
      productId,
    });
  }

  async achieveOffersByProductId(productId: string) {
    const offers = await this.offerRepo.find({
      where: {
        productId,
      },
    });

    for (const offer of offers) {
      offer.status = ProductStatus.ARCHIVED;
      await this.offerRepo.save(offer);
    }

    return 'done';
  }
}
