import { HttpException, Injectable } from '@nestjs/common';
import { OfferService } from '@src/globalServices/offer/offer.service';
import { CreateOfferDto } from './dto/CreateOfferDto.dto';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { ProductService } from '@src/globalServices/product/product.service';
import { UpdateOfferDto } from './dto/UpdateOfferDto.dto';
import { FilterOfferDto } from './dto/FilterOfferDto.dto';

@Injectable()
export class OfferManagementService {
  constructor(
    private readonly offerService: OfferService,
    private readonly productService: ProductService,
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

    const offer = new Offer();
    offer.offerCode = this.offerService.generateOfferCode();
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

    // upload images
    await this.productService.bulkAddProductImage(
      body.brandId,
      offer.id,
      body.productImages,
    );

    return await this.offerService.saveOffer(offer);
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

    offer.name = body.name;
    offer.status = body.status;
    offer.originalPrice = body.originalPrice;
    offer.discountPercentage = body.discountPercentage;
    offer.tokens = body.tokens;
    offer.description = body.description;
    offer.startDate = body.startDate;
    offer.endDate = body.endDate;

    // upload images
    await this.productService.bulkAddProductImage(
      body.brandId,
      offer.id,
      body.productImages,
    );

    return await this.offerService.saveOffer(offer);
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

  async getTopOffers(query: FilterOfferDto) {
    return await this.offerService.getTopOffers(query);
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
