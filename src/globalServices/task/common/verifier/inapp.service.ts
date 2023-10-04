import { Injectable } from '@nestjs/common';
import { CollectionService } from '@src/globalServices/collections/collections.service';
import { FollowService } from '@src/globalServices/follow/follow.service';
import { LikeService } from '@src/globalServices/like/like.service';
import { ReviewService } from '@src/globalServices/review/review.service';

@Injectable()
export class InAppTaskVerifier {
  constructor(
    private readonly followService: FollowService,
    private readonly likeService: LikeService,
    private readonly collectionService: CollectionService,
    private readonly reviewService: ReviewService,
  ) {}

  // INAPP_PRODUCT_LIKE
  async verifyUserFollowsBrand(brandId: string, userId: string) {
    const check = await this.followService.checkIfFollowing(brandId, userId);
    return !!check;
  }

  // INAPP_FOLLOW
  async verifyUserLikedAnOffer(offerId: string, userId: string) {
    const check = await this.likeService.getLikesByOfferIdAndUserId(
      offerId,
      userId,
    );
    return !!check;
  }

  // INAPP_COLLECTION
  async verifyUserCollectedAnOffer(offerId: string, userId: string) {
    const check = await this.collectionService.checkIfOfferExistInCollection(
      offerId,
      userId,
    );
    return check;
  }

  async verifyUserReviewedOffer(offerId: string, userId: string) {
    const check = await this.reviewService.getReviewByOfferAndUser({
      offer_id: offerId,
      user_id: userId,
    });

    return !!check;
  }
}
