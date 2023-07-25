import { Injectable } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { loggerFormat, loggerTransport } from './logger.module';

@Injectable()
export class LoggerService {}

export const logger = WinstonModule.createLogger({
  format: loggerFormat,
  transports: [loggerTransport],
});
