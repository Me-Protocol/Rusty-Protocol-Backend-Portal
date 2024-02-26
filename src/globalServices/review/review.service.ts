import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  // create a new review
  async createReview(review: Review): Promise<Review> {
    return await this.reviewsRepository.save(review);
  }

  // get all reviews
  async getReviews({
    page,
    limit,
    userId,
    brandId,
    offerId,
  }: {
    page: number;
    limit: number;
    userId?: string;
    brandId?: string;
    offerId?: string;
  }) {
    const reviewQuery = this.reviewsRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('user.customer', 'customer')
      .leftJoinAndSelect('review.offer', 'offer')
      .leftJoinAndSelect('offer.offerImages', 'offerImages')
      .leftJoinAndSelect('offer.brand', 'brand')
      .select([
        'review.id',
        'review.title',
        'review.review',
        'review.rating',
        'review.createdAt',
        'user.username',
        'customer.name',
        'customer.profilePicture',
        'offer.id',
        'offer.name',
        'offer.offerCode',
        'offerImages.url',
        'brand.id',
        'brand.name',
      ]);

    if (userId) {
      reviewQuery.where('review.userId = :userId', { userId });
    }

    if (brandId) {
      reviewQuery.andWhere('review.brandId = :brandId', { brandId });
    }

    if (offerId) {
      reviewQuery.andWhere('review.offerId = :offerId', { offerId });
    }

    reviewQuery.orderBy('review.createdAt', 'DESC');

    reviewQuery.skip((page - 1) * limit);
    reviewQuery.take(limit);

    const [reviews, total] = await reviewQuery.getManyAndCount();

    // Fetch all ratings for the given offer and brand
    const ratings = await this.reviewsRepository.find({
      where: {
        offerId: offerId,
        brandId: brandId,
      },
    });

    // Compute the average rating
    const averageRating =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
    const averageRatingRounded = Math.round(averageRating * 10) / 10;

    // Compute the percentage distribution of each rating
    const percentageOfEachRates = {};
    for (let rate = 1; rate <= 5; rate++) {
      const countOfRating = ratings.filter(
        (review) => review.rating === rate,
      ).length;
      const percentage = (countOfRating / ratings.length) * 100;
      percentageOfEachRates[rate] = Math.round(percentage * 10) / 10;
    }

    return {
      reviews,
      total,
      percentageOfEachRates,
      averageRating: averageRatingRounded,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async getReviewByOfferAndUser({
    offer_id,
    user_id,
  }: {
    offer_id: string;
    user_id: string;
  }) {
    return await this.reviewsRepository.findOne({
      where: {
        offerId: offer_id,
        userId: user_id,
      },
    });
  }
}

// get all reviews
