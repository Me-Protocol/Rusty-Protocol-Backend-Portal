import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  NODE_ENV,
  DATABASE_URL,
} from '../env.config';

/**
 * Database configuration module for reading properties from environment variables
 * Exported as DatabaseConfig
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        name: 'default',
        // url: configService.get('POSTGRES_HOST', DATABASE_URL),
        host: configService.get('POSTGRES_HOST', POSTGRES_HOST),
        port: configService.get('POSTGRES_PORT', POSTGRES_PORT),
        username: configService.get('POSTGRES_USER', POSTGRES_USER),
        password: configService.get('POSTGRES_PASSWORD', POSTGRES_PASSWORD),
        database: configService.get('POSTGRES_DATABASE', POSTGRES_DATABASE),
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: [join(__dirname, '../dist/migrations/**.js')],
        subscribers: [join(__dirname, '../dist/subscribers/**.js')],
        extra: {
          ssl:
            NODE_ENV === 'production' ||
            NODE_ENV === 'staging' ||
            NODE_ENV === 'development',
        },
        migrationsRun: true,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseConfig {}
