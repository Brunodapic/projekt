import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JoinRoomEventGateway } from './events/JoinRoomEvent/join-room-event.gateway';
import { ReceiveDataEventModule } from './events/ReceiveDataEvent/receive-data-event.module';

@Module({
  imports: [ReceiveDataEventModule, JoinRoomEventGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
