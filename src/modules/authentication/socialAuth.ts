import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginType } from '@src/utils/enums/LoginType';
import { MailService } from '@src/globalServices/mail/mail.service';
import { SmsService } from '@src/globalServices/sms/sms.service';
import { UserService } from '@src/globalServices/user/user.service';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import {
  TWITTER_CALLBACK_URL,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_LINK_CALLBACK_URL,
} from '@src/config/env.config';
import { AuthenticationService } from './service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const oauth = require('oauth');

@Injectable()
export class SocialAuthenticationService {
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
  ) {}

  private twitterConsumer = new oauth.OAuth(
    'https://twitter.com/oauth/request_token',
    'https://twitter.com/oauth/access_token',
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    '1.0A',
    TWITTER_CALLBACK_URL,
    'HMAC-SHA1',
  );

  async twitterAuth({
    user,
    redirectUrl,
  }: {
    user?: string;
    redirectUrl?: string;
  }): Promise<string> {
    try {
      const linkTwitterConsumer = new oauth.OAuth(
        'https://twitter.com/oauth/request_token',
        'https://twitter.com/oauth/access_token',
        TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET,
        '1.0A',
        `${TWITTER_LINK_CALLBACK_URL}?user_id=${user}&redirectUrl=${redirectUrl}`,
        'HMAC-SHA1',
      );

      if (user) {
        return new Promise((resolve, reject) => {
          linkTwitterConsumer.getOAuthRequestToken(
            (error: any, oauthRequestToken: any) => {
              if (error) {
                reject(error);
              } else {
                resolve(
                  `https://twitter.com/oauth/authenticate?oauth_token=${oauthRequestToken}`,
                );
              }
            },
          );
        });
      } else {
        return new Promise((resolve, reject) => {
          this.twitterConsumer.getOAuthRequestToken(
            (error: any, oauthRequestToken: any) => {
              if (error) {
                reject(error);
              } else {
                resolve(
                  `https://twitter.com/oauth/authenticate?oauth_token=${oauthRequestToken}`,
                );
              }
            },
          );
        });
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 400);
    }
  }

  private async getTwitterAccessToken(
    oauthRequestToken: string,
    oauthVerifier: string,
  ): Promise<{
    oauthAccessToken: string;
    oauthAccessTokenSecret: string;
  }> {
    return new Promise((resolve, reject) => {
      this.twitterConsumer.getOAuthAccessToken(
        oauthRequestToken,
        '',
        oauthVerifier,
        (error, oauthAccessToken, oauthAccessTokenSecret) => {
          if (error) {
            reject(error);
          } else {
            resolve({ oauthAccessToken, oauthAccessTokenSecret });
          }
        },
      );
    });
  }

  private async getTwitterUser(
    accessToken: string,
    accessTokenSecret: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.twitterConsumer.get(
        'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
        accessToken,
        accessTokenSecret,

        (error: any, data: any, response: any) => {
          if (error) {
            reject(error);
          } else {
            const parsedData = JSON.parse(data);

            resolve(parsedData);
          }
        },
      );
    });
  }

  async handleTwitterRedirect(
    oauthRequestToken: string,
    oauthVerifier: string,
    userAgent: string,
    ip: string,
  ) {
    try {
      const accessToken = await this.getTwitterAccessToken(
        oauthRequestToken,
        oauthVerifier,
      );

      const twitterUser = await this.getTwitterUser(
        accessToken.oauthAccessToken,
        accessToken.oauthAccessTokenSecret,
      );

      const newUser = await this.authService.socialAuth({
        email: twitterUser.email,
        name: twitterUser?.name,
        accessToken: accessToken.oauthAccessToken,
        refreshToken: accessToken.oauthAccessTokenSecret,
        provider: LoginType.TWITTER,
        profileImage: twitterUser.profile_image_url_https,
        coverImage: '',
        bio: '',
        location: '',
        website: '',
        username: null,
        userAgent,
        ip,
        userType: UserAppType.USER,
      });

      return newUser;
    } catch (error) {
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  /**
   * Callback url for twitter login
   * @param code
   * @returns access token
   **/
  async handleLinkTwitterRedirect(
    oauthRequestToken: string,
    oauthVerifier: string,
    user_id: string,
  ): Promise<any> {
    try {
      const accessToken = await this.getTwitterAccessToken(
        oauthRequestToken,
        oauthVerifier,
      );

      const twitterUser = await this.getTwitterUser(
        accessToken.oauthAccessToken,
        accessToken.oauthAccessTokenSecret,
      );

      const user = await this.userService.getUserById(user_id);

      if (!user) {
        throw new HttpException('Please login first', 400);
      } else {
        user.twitterAuth.accessToken = accessToken.oauthAccessToken;
        user.twitterAuth.refreshToken = accessToken.oauthAccessTokenSecret;
        user.twitterAuth.username = twitterUser.screen_name;

        await this.userService.saveUser(user);

        return 'Ok';
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }
}
