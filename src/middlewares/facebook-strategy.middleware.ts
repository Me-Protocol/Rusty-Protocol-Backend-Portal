import { Strategy } from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

const { FACEBOOK_CLIENT_ID, FACEBOOK_REDIRECT_URI, FACEBOOK_SECRET } =
  process.env;

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: FACEBOOK_REDIRECT_URI,
        scope: ['email', 'user_location', 'user_friends'],
        profileFields: ['id', 'email', 'displayName', 'profileUrl'],
        passReqToCallback: true,
      },
      async (
        request: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        // eslint-disable-next-line @typescript-eslint/ban-types
        done: Function,
      ) => {
        try {
          done(null, {
            profile,
            accessToken,
            refreshToken,
          });
        } catch (err) {
          console.log(err);
          done(new UnauthorizedException(), false);
        }
      },
    );
  }
}
