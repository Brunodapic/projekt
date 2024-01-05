import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JoinRoomEventGateway } from './events/JoinRoomEvent/join-room-event.gateway';
import { ReceiveDataEventModule } from './events/ReceiveDataEvent/receive-data-event.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ReceiveDataEventModule, JoinRoomEventGateway,CacheModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
