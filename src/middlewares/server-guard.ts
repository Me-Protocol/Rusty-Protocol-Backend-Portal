import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SERVER_URL } from '@src/config/env.config';
import { Observable } from 'rxjs';

@Injectable()
export class ServerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Check if the request is from the server-side
    // const request = context.switchToHttp().getRequest();
    // return request.hostname === SERVER_URL;
    return true;
  }
}
