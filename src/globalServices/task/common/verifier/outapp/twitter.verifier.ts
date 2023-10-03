import { HttpService } from '@nestjs/axios';
import { TWITTER_BREARER_TOKEN } from '@src/config/env.config';
import { map } from 'rxjs/operators';
const { Client } = require('twitter-api-sdk');

const client = new Client(TWITTER_BREARER_TOKEN);

export class TwitterTaskVerifier {
  constructor(private readonly httpService: HttpService) {}

  // OUT_SM_FOLLOW
  async checkIfUserIsFollowingBrandOnTwitter(
    user_twitter_name: string,
    tweetId: string,
  ) {
    return this.httpService
      .get(
        `https://api.twitter.com/1.1/friendships/show.json?source_screen_name=${user_twitter_name}&target_screen_name=${tweetId}`,
      )
      .pipe(map((response) => response.data.following));
  }

  // OUT_BRAND_TAGGING
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

  // OUT_LIKE_POST
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

  // OUT_REPOST
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
        (repost) => repost.username === twitter_username,
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
