import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtConfigurations } from 'src/config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/globalServices/user/user.service';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { logger } from '@src/globalServices/logger/logger.service';

@Injectable()
export class BrandJwtStrategy implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private brandService: BrandService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const headers = context.switchToHttp().getRequest().headers;
      const access_token = headers?.authorization?.split(' ')[1];

      if (!access_token)
        throw new UnauthorizedException('Unauthorized. Please login');

      const { id, device } = await this.jwtService.verify(access_token, {
        secret: jwtConfigurations.secret,
      });

      if (!id) {
        throw new UnauthorizedException('Unauthorized. Please login');
      }

      const user = await this.userService.getUserById(id);

      if (!user) {
        throw new UnauthorizedException('Unauthorized. Please login');
      }

      if (user.suspended) {
        throw new UnauthorizedException(
          'You account is currently suspended. Please contact support',
        );
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
        throw new UnauthorizedException('Please create a password');
      }

      const deviceToken = await this.userService.getDeviceById(id, device);

      if (!deviceToken) {
        throw new UnauthorizedException('Unauthorized. Please login');
      }

      delete deviceToken.token;

      request.user = {
        ...user,
        brand: user?.brandMember?.brand,
      };

      return true;
    } catch (error) {
      logger.error(error);
      throw new UnauthorizedException('Unauthorized. Please login');
    }
  }
}
