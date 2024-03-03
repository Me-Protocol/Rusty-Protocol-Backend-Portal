import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { BrandMember } from '@src/globalServices/brand/entities/brand_member.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { BrandRole } from '@src/utils/enums/BrandRole';

@Injectable()
export class BrandRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly brandService: BrandService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(BrandRole, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const brandMember = user.brandMember as BrandMember;

    return roles.includes(brandMember.role);
  }
}
