import { HttpException, Injectable } from '@nestjs/common';
import { OfferService } from '@src/globalServices/offer/offer.service';
import { CreateOfferDto } from './dto/CreateOfferDto.dto';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { ProductService } from '@src/globalServices/product/product.service';
import { UpdateOfferDto } from './dto/UpdateOfferDto.dto';
import { FilterOfferDto } from './dto/FilterOfferDto.dto';
import { RewardService } from '@src/globalServices/reward/reward.service';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { offerIndex } from '@src/modules/search/interface/search.interface';
import { ItemStatus, ProductStatus } from '@src/utils/enums/ItemStatus';

@Injectable()
export class OfferManagementService {
  constructor(
    private readonly offerService: OfferService,
    private readonly productService: ProductService,
    private readonly rewardService: RewardService,
    private readonly elasticIndex: ElasticIndex,
  ) {}

  async createOffer(body: CreateOfferDto) {
    const product = await this.productService.getOneProduct(
      body.productId,
      body.brandId,
    );

    if (!product) {
      throw new HttpException('Product not found', 404, {
        cause: new Error('Product not found'),
      });
    }

    const reward = await this.rewardService.findOneByIdAndBrand(
      body.rewardId,
      body.brandId,
    );

    if (!reward) {
      throw new HttpException('Reward not found', 404, {
        cause: new Error('Reward not found'),
      });
    }

    const offerCode = await this.offerService.generateOfferCode(body.name);

    const offer = new Offer();
    offer.offerCode = offerCode;
    offer.name = body.name;
    offer.status = body.status;
    offer.brandId = body.brandId;
    offer.productId = body.productId;
    offer.originalPrice = body.originalPrice;
    offer.discountPercentage = body.discountPercentage;
    offer.tokens = body.tokens;
    offer.description = body.description;
    offer.startDate = body.startDate;
    offer.endDate = body.endDate;
    offer.idOnBrandsite = body.idOnBrandsite;
    offer.rewardId = body.rewardId;

    const saveOffer = await this.offerService.saveOffer(offer);

    // upload images
    await this.offerService.bulkAddOfferImage(
      body.brandId,
      saveOffer.id,
      body.offerImages,
    );

    const findOne = await this.offerService.getOfferById(saveOffer.id);

    if (saveOffer.status === ProductStatus.PUBLISHED) {
      this.elasticIndex.insertDocument(findOne, offerIndex);
    }

    return findOne;
  }

  async updateOffer(id: string, body: UpdateOfferDto) {
    const offer = await this.offerService.getBrandOfferById(id, body.brandId);

    if (!offer) {
      throw new HttpException('Offer not found', 404, {
        cause: new Error('Offer not found'),
      });
    }

    if (body.productId !== offer.productId) {
      const product = await this.productService.getOneProduct(
        body.productId,
        body.brandId,
      );

      if (!product) {
        throw new HttpException('Product not found', 404, {
          cause: new Error('Product not found'),
        });
      }

      offer.productId = body.productId;
    }

    const reward = await this.rewardService.findOneByIdAndBrand(
      body.rewardId,
      body.brandId,
    );

    if (!reward) {
      throw new HttpException('Reward not found', 404, {
        cause: new Error('Reward not found'),
      });
    }

    if (body.name) offer.name = body.name;
    if (body.status) offer.status = body.status;
    if (body.originalPrice) offer.originalPrice = body.originalPrice;
    if (body.discountPercentage)
      offer.discountPercentage = body.discountPercentage;
    if (body.tokens) offer.tokens = body.tokens;
    if (body.description) offer.description = body.description;
    if (body.startDate) offer.startDate = body.startDate;
    if (body.endDate) offer.endDate = body.endDate;
    if (body.idOnBrandsite) offer.idOnBrandsite = body.idOnBrandsite;
    if (body.rewardId) offer.rewardId = body.rewardId;

    // upload images
    await this.productService.bulkAddProductImage(
      body.brandId,
      offer.id,
      body.productImages,
    );

    const saveOffer = await this.offerService.saveOffer(offer);

    const findOne = await this.offerService.getOfferById(offer.id);

    if (saveOffer.status === ProductStatus.PUBLISHED) {
      this.elasticIndex.updateDocument(findOne, offerIndex);
    } else if (saveOffer.status === ProductStatus.ARCHIVED) {
      this.elasticIndex.deleteDocument(offerIndex, offer.id);
    }

    return findOne;
  }

  async getOfferByofferCode(offerCode: string, sessionId: string) {
    return await this.offerService.getOfferByofferCode(offerCode, sessionId);
  }

  async getOfferForLoggedInUser(
    userId: string,
    offerCode: string,
    sessionId: string,
  ): Promise<Offer> {
    return await this.offerService.getOfferForLoggedInUser(
      userId,
      offerCode,
      sessionId,
    );
  }

  async getOffers(query: FilterOfferDto) {
    return await this.offerService.getOffers(query);
  }

  async getTopOffersForUser(query: FilterOfferDto) {
    return await this.offerService.getTopOffersForUser(
      query.page,
      query.limit,
      query.userId,
    );
  }

  async getBrandOffers(query: FilterOfferDto) {
    return await this.offerService.getBrandOffers(
      query.page,
      query.limit,
      query.brandId,
      query.status,
      query.orderBy,
    );
  }

  async deleteOffer(id: string, brandId: string) {
    const offer = await this.offerService.getBrandOfferById(id, brandId);

    if (!offer) {
      throw new HttpException('Offer does not exist or has been deleted', 400);
    }

    await this.offerService.deleteOffer(offer.id, brandId);

    return {
      message: 'Offer deleted successfully',
    };
  }
}
