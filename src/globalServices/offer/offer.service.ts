import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { UserService } from '../user/user.service';
import { ItemStatus, ProductStatus } from '@src/utils/enums/ItemStatus';
import { ProductImage } from '../product/entities/productImage.entity';
import { ViewsService } from '../views/view.service';
import { OfferFilter, OfferSort } from '@src/utils/enums/OfferFiilter';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>,

    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,

    private readonly userService: UserService,
    private readonly viewService: ViewsService,
  ) {}

  async saveOffer(offer: Offer) {
    return await this.offerRepo.save(offer);
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
        'product.subCategory',
        'offerImages',
        'reward',
      ],
    });
  }

  async getOfferByofferCode(
    offerCode: string,
    sessionId: string,
    userId?: string,
  ) {
    const offer = await this.offerRepo.findOne({
      where: {
        offerCode,
      },
      relations: [
        'brand',
        'product',
        'product.category',
        'product.subCategory',
        'offerImages',
        'reward',
      ],
    });

    if (!offer) {
      return null;
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
    await this.userService.updateUserCategoryInterests(
      userId,
      offer.product.category.id,
    );

    return offer;
  }

  async getOffers({
    page,
    limit,
    category,
    subCategory,
    brandId,
    sort,
  }: {
    page: number;
    limit: number;
    category?: string;
    subCategory?: string;
    brandId?: string;
    sort: OfferSort;
  }) {
    const offersQuery = this.offerRepo
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.subCategory', 'subCategory')
      .leftJoinAndSelect('offer.offerImages', 'offerImages')
      .leftJoinAndSelect('offer.brand', 'brand')
      .leftJoinAndSelect('offer.reward', 'reward')
      .where('offer.status = :status', { status: ItemStatus.PUBLISHED });

    if (category) {
      offersQuery.andWhere('product.categoryId = :categoryId', {
        categoryId: category,
      });
    }

    if (subCategory) {
      offersQuery.andWhere('product.subCategoryId = :subCategoryId', {
        subCategoryId: subCategory,
      });
    }

    if (brandId) {
      offersQuery.andWhere('offer.brandId = :brandId', { brandId });
    }

    if (sort === OfferSort.TRENDING) {
      offersQuery.orderBy('offer.viewCount', 'DESC');
      offersQuery.addOrderBy('offer.likeCount', 'DESC');
      offersQuery.addOrderBy('offer.updatedAt', 'DESC');
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
      offersQuery.andWhere('offer.endDate > :endDate', {
        endDate: new Date(),
      });
      offersQuery.orderBy('offer.endDate', 'ASC');
    }

    offersQuery.skip((page - 1) * limit);
    offersQuery.take(limit);

    const offers = await offersQuery.getMany();
    const total = await offersQuery.getCount();

    return {
      offers,
      total,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  async getTopOffersForUser(page: number, limit: number, userId: string) {
    // Get user interests
    const interests = await this.userService.getUserCategoryInterests(userId);

    // Check if user has any interests
    if (interests.length === 0) {
      // Get trending offers if user has no interests

      const trendingOffers = await this.offerRepo.find({
        where: {
          status: ProductStatus.PUBLISHED,
          updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
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
          product: {
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
          'product.subCategory',
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
        nextPage: total > page * limit ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      };
    } else {
      // Get offers based on users first interest
      const offers = await this.offerRepo.find({
        where: {
          status: ProductStatus.PUBLISHED,
          product: {
            category: {
              id: In(interests),
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        relations: [
          'brand',
          'product',
          'product.category',
          'product.subCategory',
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
        nextPage: total > page * limit ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
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
  ) {
    const offersQuery = this.offerRepo
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.subCategory', 'subCategory')
      .leftJoinAndSelect('offer.offerImages', 'offerImages')
      .leftJoinAndSelect('offer.brand', 'brand')
      .leftJoinAndSelect('offer.reward', 'reward')
      .where('offer.brandId = :brandId', { brandId });

    if (status) {
      offersQuery.andWhere('offer.status = :status', { status });
    }

    if (orderBy === OfferFilter.MOST_SALES) {
      offersQuery.orWhere('offer.totalOrders > :totalOrders', {
        totalOrders: 4, // TODO: Change this to 100,,
      });
    }

    if (orderBy === OfferFilter.MOST_VIEWED) {
      offersQuery.orWhere('offer.viewCount > :viewCount', {
        viewCount: 10, // TODO: Change this to 100,
      });
    }

    if (orderBy === OfferFilter.MOST_RECENT) {
      // where createdAt is less than 7 days
      offersQuery.andWhere('offer.createdAt > :createdAt', {
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
      });
    }

    if (orderBy === OfferFilter.LOW_IN_STOCK) {
      //  where offer product stock is less than 10
      offersQuery.andWhere('product.inventory < :inventory', {
        stock: 10,
      });
    }

    if (order) {
      const formatedOrder = order.split(':')[0];
      const acceptedOrder = new Offer();
      if (!acceptedOrder.hasOwnProperty(formatedOrder)) {
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
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
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
    amount,
  }: {
    offer: Offer;
    amount: number;
  }) {
    offer.totalOrders = offer.totalOrders + 1;
    offer.totalSales = offer.totalSales + amount;

    return await this.offerRepo.save(offer);
  }
}
