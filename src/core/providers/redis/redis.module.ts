import { DynamicModule, Module, Provider } from '@nestjs/common';

import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

import { REDIS_PROVIDER } from '../../constants';

import { RedisService } from './redis.service';

interface CacheOptions {
  host: string;
  port: number;
}

@Module({})
export class RedisModule {
  /**
   * Create a DynamicModule for the CacheModule with the given options.
   * @param {CacheOptions} options - the options for connecting to Redis
   * @return {DynamicModule} the created DynamicModule for CacheModule
   */
  public static forRoot(options: CacheOptions): DynamicModule {
    const redisProvider: Provider = {
      provide: REDIS_PROVIDER,
      useClass: RedisService,
    };

    return {
      global: true,
      imports: [
        CacheModule.register<RedisClientOptions>({
          store: redisStore,
          host: options.host,
          port: options.port,
        }),
      ],
      providers: [redisProvider],
      exports: [redisProvider],
      module: RedisModule,
    };
  }
}
