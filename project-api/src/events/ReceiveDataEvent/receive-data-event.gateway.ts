import { Inject, Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SocketEventNames } from '../SocketEventNames.enum';
import { ReceiveDataEventDto } from './receive-data-event.dto';
import { Socket } from 'socket.io';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
@WebSocketGateway({ cors: true })
export class ReceiveDataEventGateway {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }
  @WebSocketServer() server;

  @SubscribeMessage(SocketEventNames.SEND_DATA_EVENT)
  async handleUserSpeedEvent(
    @MessageBody() dto: ReceiveDataEventDto,
    @ConnectedSocket() socket: Socket
  ): Promise<ReceiveDataEventDto> {
    const value: Set<string> = await this.cacheManager.get('rooms');
    const updatedValue = value instanceof Set ? value : new Set('1');
    updatedValue.add(dto.roomId);
    await this.cacheManager.set('rooms', updatedValue, 0);
    socket.to(dto.roomId).emit(dto.roomId, dto.data);
    return dto;
  }
}
