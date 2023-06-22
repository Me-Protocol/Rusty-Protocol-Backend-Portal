import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('twitter-api-sdk');

const { TWITTER_BREARER_TOKEN } = process.env;

const client = new Client(TWITTER_BREARER_TOKEN);

@Injectable()
export class TasksResultService {
  constructor(
    private readonly followService: FollowerService,
    private readonly likeService: LikesService,
    private readonly shareService: SharesService,
    private readonly collectionService: CollectionsService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

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

  // OUTAPP_SM_FOLLOW
  async checkIfUserIsFollowingBrandOnTwitter(
    user_twitter_name: string,
    brand_twitter_name: string,
  ) {
    return this.httpService
      .get(
        `https://api.twitter.com/1.1/friendships/show.json?source_screen_name=${user_twitter_name}&target_screen_name=${brand_twitter_name}`,
      )
      .pipe(map((response: any) => response.data.following));
  }

  // OUTAPP_BRAND_TAGGING
  async checkIfUserTaggedBrandOnTwitter(
    brandTwitterUsername: string,
    tweetId: string,
  ) {
    const tweet = await client.tweets.findTweetById(tweetId);

    if (!tweet) {
      return false;
    }

    if (tweet.data.entities.mentions.length > 0) {
      const brandMention = tweet.data.entities.mentions.find(
        (mention) => mention.username === brandTwitterUsername,
      );

      if (brandMention) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // OUTAPP_LIKE_POST
  async checkIfUserLikesPostOnTwitter(
    twitter_username: string,
    tweetId: string,
  ) {
    const likes = await client.users.tweetsIdLikingUsers(tweetId);

    if (!likes) {
      return false;
    }

    if (likes.data.length > 0) {
      const userLike = likes.data.find(
        (like) => like.username === twitter_username,
      );

      if (userLike) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // OUTAPP_REPOST
  async checkIfUserRepostedPostOnTwitter(
    twitter_username: string,
    tweetId: string,
  ) {
    const reposts = await client.users.tweetsIdRetweetingUsers(tweetId);

    if (!reposts) {
      return false;
    }

    if (reposts.data.length > 0) {
      const userRepost = reposts.data.find(
        (repost: any) => repost.username === twitter_username,
      );

      if (userRepost) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
