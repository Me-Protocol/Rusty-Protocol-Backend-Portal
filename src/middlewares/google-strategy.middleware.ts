import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { logger } from '@src/globalServices/logger/logger.service';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } =
  process.env;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_REDIRECT_URI,
        scope: ['profile', 'email'],
      },
      async (
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        // eslint-disable-next-line @typescript-eslint/ban-types
        done: Function,
      ) => {
        try {
          const userType = req.query.userType;
          console.log(userType);

          done(null, {
            profile,
            accessToken,
            refreshToken,
          });
        } catch (err) {
          logger.error(err);
          done(new UnauthorizedException(), false);
        }
      },
    );
  }
}
