import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SocketEventNames } from '../SocketEventNames.enum';
import { ReceiveDataEventDto } from './receive-data-event.dto';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: true })
export class ReceiveDataEventGateway {
  @WebSocketServer() server;

  @SubscribeMessage(SocketEventNames.SEND_DATA_EVENT)
  async handleUserSpeedEvent(
    @MessageBody() dto: ReceiveDataEventDto,
    @ConnectedSocket() socket: Socket
  ): Promise<ReceiveDataEventDto> {
    //this.server.in(dto.roomId).emit(SocketEventNames.SEND_DATA_EVENT, dto.data);
    console.log(dto)
    socket.to(dto.roomId).emit(dto.roomId, dto.data);

    return dto;
  }
}
