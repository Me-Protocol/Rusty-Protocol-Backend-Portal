import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtConfigurations } from 'src/config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/globalServices/user/user.service';
import { logger } from '@src/globalServices/logger/logger.service';
import { Role } from '@src/utils/enums/Role';

@Injectable()
export class AdminJwtStrategy implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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

      if (user.role !== Role.ADMIN) {
        throw new UnauthorizedException('Unauthorized. Please login');
      }

      if (user.banned) {
        throw new UnauthorizedException(
          'You account has been banned. Please contact support',
        );
      }

      if (!user.emailVerified) {
        throw new UnauthorizedException(
          'You account is not verified. Please verify your account',
        );
      }

      const deviceToken = await this.userService.getDeviceById(id, device);

      if (!deviceToken) {
        throw new UnauthorizedException('Unauthorized. Please login');
      }

      delete deviceToken.token;

      request.user = user;

      return true;
    } catch (error) {
      logger.error(error);
      throw new UnauthorizedException('Unauthorized. Please login');
    }
  }
}
