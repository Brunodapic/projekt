import { Module } from '@nestjs/common';
import { JoinRoomEventGateway } from './join-room-event.gateway';

@Module({
  providers: [JoinRoomEventGateway],
})
export class JoinRoomEventModule {}
