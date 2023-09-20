import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ELASTIC_NODE,
  ELASTIC_USERNAME,
  ELASTIC_PASSWORD,
  ELASTIC_CA,
} from '../env.config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

/**
 * Database configuration module for reading properties from environment variables
 * Exported as DatabaseConfig
 */
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        node: configService.get('ELASTIC_NODE', ELASTIC_NODE),
        auth: {
          username: configService.get('ELASTIC_USERNAME', ELASTIC_USERNAME),
          password: configService.get('ELASTIC_PASSWORD', ELASTIC_PASSWORD),
        },
        tls: {
          ca: configService.get('ELASTIC_CA', ELASTIC_CA),
          rejectUnauthorized: false,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        requestTimeout: 30000,
      }),
    }),
  ],
})
export class ElasticSearchConfig {}
