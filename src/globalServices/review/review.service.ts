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
  async getAllReviews(offer_id: string): Promise<Review[]> {
    return await this.reviewsRepository.find({
      where: {
        offerId: offer_id,
      },
      relations: ['user', 'offer'],
      select: {
        title: true,
        rating: true,
        review: true,
        createdAt: true,
        user: {
          username: true,
          customer: {
            name: true,
            profilePicture: true,
          },
        },
      },
    });
  }

  // get all users reviews
  async getAllUsersReviews(user_id: string): Promise<Review[]> {
    return await this.reviewsRepository.find({
      where: {
        userId: user_id,
      },
      relations: ['user', 'offer'],
      select: {
        title: true,
        rating: true,
        review: true,
        createdAt: true,
        user: {
          username: true,
          customer: {
            name: true,
            profilePicture: true,
          },
        },
      },
    });
  }
}
