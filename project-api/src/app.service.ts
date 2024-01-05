import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  async getRooms(): Promise<string[]> {
    const value: Set<string> = await this.cacheManager.get('rooms');
    if(value && value.size !== 0) return [...value]
    const updatedValue = new Set('1');
    await this.cacheManager.set('rooms', updatedValue, 0);
    return [...updatedValue]
  }
}
