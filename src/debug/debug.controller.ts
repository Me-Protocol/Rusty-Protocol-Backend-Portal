import { Controller, Get } from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Controller()
export class DebugController {
  @Get('debug-sentry')
  testSentry() {
    try {
      throw new Error('My first Sentry error!');
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
