import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload, jwtConfigurations } from 'src/config/jwt.config';
import { UserService } from '@src/globalServices/user/user.service';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { BrandService } from '@src/globalServices/brand/brand.service';

@Injectable()
export class BrandJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private brandService: BrandService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfigurations.secret,
    });
  }

  // get token

  async validate(payload: JwtPayload) {
    if (!payload.id) {
      throw new UnauthorizedException('Unauthorized. Please login');
    }

    const user = await this.userService.getUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Unauthorized. Please login');
    }

    if (user.userType !== UserAppType.BRAND) {
      throw new UnauthorizedException('Unauthorized. Please login');
    }

    if (user.suspended) {
      throw new UnauthorizedException(
        'You account is currently suspended. Please contact support',
      );
    }

    if (user.banned) {
      throw new UnauthorizedException(
        'You account has been banned. Please contact support',
      );
    }

    if (!user.phoneVerified && !user.emailVerified) {
      throw new UnauthorizedException(
        'You account is not verified. Please verify your account',
      );
    }

    if (!user.password) {
      throw new HttpException('Please create a password', 400);
    }

    const deviceToken = await this.userService.getDeviceById(
      payload.id,
      payload.device,
    );

    if (!deviceToken) {
      throw new UnauthorizedException('Unauthorized. Please login');
    }

    const brandDetails = await this.brandService.getBrandByUserId(payload.id);

    delete deviceToken.token;

    return {
      ...user,
      deviceToken,
      brand: brandDetails,
    };
  }
}
