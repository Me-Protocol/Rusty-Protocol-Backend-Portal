import { HttpException, Injectable } from '@nestjs/common';
import { ReviewService } from '@src/globalServices/review/review.service';
import { ReviewDto } from './dto/ReviewDto.dto';
import { OfferService } from '@src/globalServices/offer/offer.service';
import { Review } from '@src/globalServices/review/entities/review.entity';
import { FilterReviewDto } from './dto/FilterReviewsDto.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ReviewManagementService {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly offerService: OfferService,
    private eventEmitter: EventEmitter2,
  ) {}

  async createReview({ title, userId, offerId, review, rating }: ReviewDto) {
    try {
      const offer = await this.offerService.getOfferById(offerId);
      if (!offer) {
        throw new HttpException('Offer not found', 404);
      }

      const reviewRecord = new Review();
      reviewRecord.title = title;
      reviewRecord.userId = userId;
      reviewRecord.offerId = offerId;
      reviewRecord.review = review;
      reviewRecord.rating = rating;
      reviewRecord.brandId = offer.brandId;

      this.eventEmitter.emit('process.bill.create', {
        brandId: offer.brandId,
        type: 'redeem-view',
        offerId: offerId,
      });

      return await this.reviewService.createReview(reviewRecord);
    } catch (error) {
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getReviews(query: FilterReviewDto) {
    return await this.reviewService.getReviews(query);
  }
}
