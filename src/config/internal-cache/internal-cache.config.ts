import { CacheModule, Module } from '@nestjs/common';
import { InternalCacheService } from './internal-cache.service';
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';
import { REDIS_PASSWORD, REDIS_HOSTNAME, REDIS_PORT, REDIS_TTL } from '../env.config';

@Module({
  imports: [
    CacheModule.registerAsync<ClientOpts>({
      useFactory: async () => ({
        store: redisStore,
        password: REDIS_PASSWORD,
        host: REDIS_HOSTNAME,
        port: REDIS_PORT,
        ttl: REDIS_TTL,
      }),
    }),
  ],
  providers: [InternalCacheService],
  exports: [InternalCacheService],
})
export class InternalCacheModule {}
