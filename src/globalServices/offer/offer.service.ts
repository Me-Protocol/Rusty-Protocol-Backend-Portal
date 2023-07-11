import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { UserService } from '../user/user.service';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { ProductImage } from '../product/entities/productImage.entity';
import { ViewsService } from '../views/view.service';

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

  async getTopOffers({
    page,
    limit,
    category,
    subCategory,
    brandId,
  }: {
    page: number;
    limit: number;
    category?: string;
    subCategory?: string;
    brandId?: string;
  }) {
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
        product: {
          category: {
            id: category,
          },
          subCategory: {
            id: subCategory,
          },
        },
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

  async getTopOffersForUser(page: number, limit: number, userId: string) {
    // Get user interests
    const interests = await this.userService.getUserCategoryInterests(userId);

    // Check if user has any interests
    if (interests.length === 0) {
      return {
        offers: [],
        total: 0,
        nextPage: null,
        previousPage: null,
      };
    } else {
      // Get offers based on users first interest
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

  async bulkAddOfferImage(brandId: string, offerId: string, images: string[]) {
    const offer = await this.offerRepo.findOne({
      where: {
        id: offerId,
        brandId,
      },
    });
    if (!offer) {
      throw new Error('Product not found');
    }

    const productImages = images.map((image) =>
      this.productImageRepo.create({
        url: image,
        offer,
      }),
    );

    return this.productImageRepo.save(productImages);
  }

  async generateOfferCode() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const offer = await this.offerRepo.findOne({
      where: {
        offerCode: code,
      },
    });

    if (offer) {
      return this.generateOfferCode();
    }

    return code;
  }

  async deleteOffer(offerId: string, brandId: string) {
    return await this.offerRepo.delete({
      id: offerId,
      brandId,
    });
  }
}
