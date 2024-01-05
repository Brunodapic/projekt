import { Module } from '@nestjs/common';
import { ReceiveDataEventGateway } from './receive-data-event.gateway';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [ReceiveDataEventGateway],
})
export class ReceiveDataEventModule {}
