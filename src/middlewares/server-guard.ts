import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ServerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Check if the request is from the server-side
    const request = context.switchToHttp().getRequest();
    return request.hostname === '127.0.0.1'; // TODO Replace 'localhost' with your server's domain or IP address
  }
}
