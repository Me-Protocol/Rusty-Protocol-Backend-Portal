
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  APP_SERVER_LISTEN_PORT,
} from '../env.config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TracingModule } from '@dollarsign/nestjs-jaeger-tracing';

/**
 * Database configuration module for reading properties from environment variables
 * Exported as DatabaseConfig
 */
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'tracking-service',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          name: 'tracking-service',
          transport: Transport.TCP,
          options: {
            port: configService.get('APP_SERVER_LISTEN_PORT', APP_SERVER_LISTEN_PORT),
            ...TracingModule.getParserOptions(), // this method will return serializer that inject tracing id to microservice payload.
          },
        }),
      },
    ]),
  ],
})
export class ClientModuleConfig {}
