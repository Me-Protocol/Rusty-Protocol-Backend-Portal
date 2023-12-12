import { Module } from '@nestjs/common';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { InternalCacheService } from './internal-cache.service';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import {
  REDIS_PASSWORD,
  REDIS_HOSTNAME,
  REDIS_PORT,
  REDIS_TTL,
} from '../env.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('REDIS_HOSTNAME', REDIS_HOSTNAME),
            port: configService.get('REDIS_PORT', REDIS_PORT),
          },
          password: configService.get('REDIS_PASSWORD', REDIS_PASSWORD),
        });

        return {
          store: {
            create: () => store as unknown as CacheStore,
          },
          ttl: +REDIS_TTL,
        };
      },
    }),
  ],
  providers: [InternalCacheService],
  exports: [InternalCacheService],
})
export class InternalCacheModule {}
