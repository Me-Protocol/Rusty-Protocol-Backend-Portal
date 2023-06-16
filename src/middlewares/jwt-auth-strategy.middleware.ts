import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtConfigurations } from 'src/config/jwt.config';
import { UserService } from '@src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthStrategy implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const headers = context.switchToHttp().getRequest().headers;
    const access_token = headers.authorization.split(' ')[1];

    const { id } = await this.jwtService.verify(access_token, {
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

    request.user = user;

    return true;
  }
}
