import { Inject, Injectable, Logger } from '@nestjs/common';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InternalServerErrorException } from '../../exceptions';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  /**
   * Asynchronously gets the value associated with the specified key from the Redis database.
   *
   * @param {string} key - the key to look up in the Redis database
   * @return {Promise<T>} the value associated with the specified key
   */
  public async get<T>(key: string): Promise<T> {
    try {
      return await this.cache.get(key);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(`Failed to get ${key} from cache!`);
    }
  }

  /**
   * Set a key-value pair in the cache with a specified time-to-live.
   *
   * @param {string} key - the key to set in the cache
   * @param {unknown} value - the value to associate with the key
   * @param {number} ttl - the time-to-live for the key-value pair in seconds
   * @return {Promise<void>} a Promise that resolves when the key-value pair is successfully set in the cache
   */
  public async set<T>(key: string, value: unknown, ttl: number): Promise<void> {
    try {
      return await this.cache.set<T>(key, value, ttl);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(`Failed to set ${key} in cache!`);
    }
  }

  /**
   * Deletes a cache entry by key.
   *
   * @param {string} key - The key of the cache entry to delete
   * @return {Promise<void>} A promise that resolves when the cache entry is deleted
   */
  public async delete<T>(key: string): Promise<void> {
    try {
      return await this.cache.del<T>(key);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(`Failed to delete ${key} from cache!`);
    }
  }

  /**
   * Reset the function to its initial state.
   *
   * @return {Promise<void>} The result of the reset operation as a Promise
   */
  public async reset(): Promise<void> {
    try {
      return await this.cache.reset();
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Failed to reset cache!');
    }
  }
}
