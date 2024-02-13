import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@src/globalServices/user/entities/user.entity';
import { AdminRole } from '@src/utils/enums/AdminRole';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<AdminRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles || roles.length === 0) {
      // No roles are specified, allow access
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    // Check if the user has any of the required roles
    const hasRole = user.adminMember.roles.some((role) => roles.includes(role));

    return hasRole;
  }
}
