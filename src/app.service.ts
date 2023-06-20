import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Synchro is running: ${new Date().toISOString()}`;
  }
}
