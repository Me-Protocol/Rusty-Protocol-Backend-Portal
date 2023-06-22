import { Injectable } from '@nestjs/common';

@Injectable()
export class InAppService {
  constructor() {}

  // INAPP_PRODUCT_LIKE
  async verifyUserFollowsBrand(brandId: number, userId: number) {
    const check = await this.followService.checkIfFollowing(brandId, userId);
    return !!check;
  }

  // INAPP_FOLLOW
  async verifyUserLikedAnOffer(offerId: number, userId: number) {
    const check = await this.likeService.getLikesByIdAndUserId(offerId, userId);
    return !!check;
  }

  // INAPP_SHARE
  async verifyUserSharedAnOffer(offerId: number, userId: number) {
    const check = await this.shareService.checkIfShared(offerId, userId);
    return check;
  }

  // INAPP_COLLECTION
  async verifyUserCollectedAnOffer(offerId: number, userId: number) {
    const check = await this.collectionService.checkIfOfferExistInCollection(
      offerId,
      userId,
    );
    return check;
  }
}
