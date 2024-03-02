import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@src/globalServices/user/entities/user.entity';
import { BrandRole } from '@src/utils/enums/BrandRole';

@Injectable()
export class BrandRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(BrandRole, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    return roles.includes(user?.brandMember?.role);
  }
}
