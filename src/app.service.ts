import { Injectable } from '@nestjs/common';
console.log('sama');

@Injectable()
export class AppService {
  getHello(): string {
    return `Synchro is running: ${new Date().toISOString()}`;
  }
}
