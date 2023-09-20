import { Controller, Get } from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Controller()
export class DebugController {
  @Get('debug-sentry')
  firstTestSentry() {
    try {
      throw new Error('My second Sentry error!');
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  @Get('debug-sentry-test')
  secondTestSentry() {
    try {
      throw new Error('My second Sentry error!');
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  @Get('debug-sentry-testing')
  thirdTestSentry() {
    try {
      throw new Error('My third Sentry error!');
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  @Get('test-error')
  fourthTestSentry() {
    throw new Error('This is an intentional test error');
  }
}
