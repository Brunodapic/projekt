import { SubscribeMessage, ConnectedSocket } from '@nestjs/websockets';
import {
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { Socket } from 'socket.io';
import { SocketEventNames } from '../SocketEventNames.enum';
import { JoinRoomEventDto } from './join-room-event.dto';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class JoinRoomEventGateway {
  @WebSocketServer() server;

  @SubscribeMessage(SocketEventNames.JOIN_ROOM_EVENT)
  handleRoomJoinEvent(
    @MessageBody() dto: JoinRoomEventDto,
    @ConnectedSocket() socket: Socket,
  ): JoinRoomEventDto {
    console.log(dto);
    const roomId = dto.roomId;
    const previousRoomId = dto.previousRoomId;
    if (previousRoomId !== roomId) {
      if (previousRoomId) {
        socket.leave(previousRoomId);
      }
      if (roomId) {
        socket.join(roomId);
      }
    }

    this.server.in(roomId).emit(SocketEventNames.JOIN_ROOM_EVENT, 'JOIN');

    return dto;
  }
}
