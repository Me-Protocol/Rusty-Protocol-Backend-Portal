import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

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
          done(new UnauthorizedException(), false);
        }
      },
    );
  }
}
