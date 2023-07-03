import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { UserService } from '../user/user.service';
import { ItemStatus } from '@src/utils/enums/ItemStatus';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>,

    private readonly userService: UserService,
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
      ],
    });
  }

  async getOfferByofferCode(offerCode: string) {
    return await this.offerRepo.findOne({
      where: {
        offerCode,
      },
      relations: [
        'brand',
        'product',
        'product.category',
        'product.subCategory',
      ],
    });
  }

  async getOfferForLoggedInUser(
    userId: string,
    offerCode: string,
  ): Promise<Offer> {
    const offer = await this.getOfferByofferCode(offerCode);

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

  async getTopOffers(
    page: number,
    limit: number,
    category: string,
    subCategory: string,
    brand,
  ) {
    const offers = await this.offerRepo.find({
      where: {
        status: ItemStatus.PUBLISHED,
        product: {
          category: {
            id: category,
          },
          subCategory: {
            id: subCategory,
          },
        },
        brandId: brand,
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: [
        'brand',
        'product',
        'product.category',
        'product.subCategory',
      ],
      order: {
        likeCount: 'DESC',
        viewCount: 'DESC',
      },
    });

    const total = await this.offerRepo.count({
      where: {
        status: ItemStatus.PUBLISHED,
        product: {
          category: {
            id: category,
          },
          subCategory: {
            id: subCategory,
          },
        },
        brandId: brand,
      },
    });

    return {
      offers,
      total,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  async getTopOffersForUser(page: number, limit: number, userId: string) {
    const interests = await this.userService.getUserCategoryInterests(userId);
    if (interests.length === 0) {
      return {
        offers: [],
        total: 0,
        nextPage: null,
        previousPage: null,
      };
    } else {
      const offers = await this.offerRepo.find({
        where: {
          status: ItemStatus.PUBLISHED,
          product: {
            category: {
              id: interests[0],
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
        ],
        order: {
          likeCount: 'DESC',
          viewCount: 'DESC',
        },
      });

      const total = await this.offerRepo.count({
        where: {
          status: ItemStatus.PUBLISHED,
          product: {
            category: {
              id: interests[0],
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

  async getBrandOffers(page: number, limit: number, brandId: string) {
    const offers = await this.offerRepo.find({
      where: {
        status: ItemStatus.PUBLISHED,
        brandId,
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: [
        'brand',
        'product',
        'product.category',
        'product.subCategory',
      ],
      order: {
        likeCount: 'DESC',
        viewCount: 'DESC',
      },
    });

    const total = await this.offerRepo.count({
      where: {
        status: ItemStatus.PUBLISHED,
        brandId,
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
