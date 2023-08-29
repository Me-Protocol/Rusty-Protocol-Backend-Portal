import { HttpException, Injectable } from '@nestjs/common';
import { LikeService } from '@src/globalServices/like/like.service';
import { LikeDto } from './dto/LikeDto.dto';
import { Like } from '@src/globalServices/like/entities/like.entity';
import { OfferService } from '@src/globalServices/offer/offer.service';
import { CollectionService } from '@src/globalServices/collections/collections.service';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { FilterLikeDto } from './dto/FilterLikeDto.dto';
import { logger } from '@src/globalServices/logger/logger.service';

@Injectable()
export class LikeManagementService {
  constructor(
    private readonly likeService: LikeService,
    private readonly offerService: OfferService,
    private readonly collectionService: CollectionService,
  ) {}

  async createLike(body: LikeDto) {
    try {
      const like = new Like();

      const offer = await this.offerService.getOfferById(body.offerId);

      if (!offer) {
        throw new Error('Offer not found');
      }

      // Check if there is collection id
      if (body.collectionId) {
        const collection = await this.collectionService.findOne({
          userId: body.userId,
          id: body.collectionId,
        });

        if (!collection) {
          throw new Error('Collection not found');
        }

        // Check if offer is in any collection
        const offerInCollection = await this.likeService.getLikesByIdAndUserId(
          body.offerId,
          body.userId,
        );

        if (offerInCollection) {
          offerInCollection.collectionId = body.collectionId;

          const like = await this.likeService.updateLike(
            offerInCollection.id,
            offerInCollection,
          );

          return like;
        }

        // If no collection but collection id is provided
        like.collectionId = body.collectionId;
      } else {
        // if no collection id use the first collection on users collections or create new one for user

        const userDefaultCollection =
          await this.collectionService.findDefaultCollection({
            userId: body.userId,
          });

        if (userDefaultCollection) {
          // Check if offer is in collection
          const offerInCollection =
            await this.likeService.getLikesByIdAndUserId(
              body.offerId,
              body.userId,
            );

          if (offerInCollection) {
            return offerInCollection;
          }

          like.collectionId = userDefaultCollection.id;
          // return this.response.error(res, usersCollection, 'DDD');
        } else {
          const newCollection = await this.collectionService.create({
            name: 'My Collection',
            userId: body.userId,
            description: 'My Collection',
            image: offer.offerImages[0]?.url,
            status: ItemStatus.PRIVATE,
          });

          like.collectionId = newCollection.id;
        }
      }

      like.offerId = body.offerId;
      like.userId = body.userId;

      const createdLike = await this.likeService.createLike(like);

      offer.likeCount = offer.likeCount + 1;

      await this.offerService.saveOffer(offer);

      return createdLike;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 500, {
        cause: new Error(error.message),
      });
    }
  }

  async unlike(body: LikeDto) {
    try {
      await this.likeService.unlikeWithOfferIdAndUserId(
        body.offerId,
        body.userId,
      );

      return 'Successfully unliked';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 500, {
        cause: new Error(error.message),
      });
    }
  }

  async checkIfOfferIsLiked(body: LikeDto) {
    try {
      const like = await this.likeService.getLikesByIdAndUserId(
        body.offerId,
        body.userId,
      );

      if (like) {
        return true;
      }

      return false;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getUserLikes(query: FilterLikeDto) {
    try {
      const likes = await this.likeService.getUserLikes(
        query.userId,
        query.orderBy,
      );
      return likes;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }
}
