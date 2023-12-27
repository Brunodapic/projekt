import { Module } from '@nestjs/common';
import { ReceiveDataEventGateway } from './receive-data-event.gateway';

@Module({
  providers: [ReceiveDataEventGateway],
})
export class ReceiveDataEventModule {}
