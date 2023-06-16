import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { LoggerService } from './logger.service';

// use daily rotate file to log to file
export const loggerTransport = new winston.transports.DailyRotateFile({
  filename: 'log-%DATE%.log',
  auditFile: `audit.json`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: 'logs',
});

loggerTransport.on('rotate', function (oldFilename: any, newFilename: any) {
  console.log(`Rotating log file from ${oldFilename} to ${newFilename}`);
});

export const loggerFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info: any) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

@Module({
  imports: [
    WinstonModule.forRoot({
      format: loggerFormat,
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      transports: [loggerTransport],
    }),
  ],
  providers: [LoggerService],
})
export class LoggerModule {}
