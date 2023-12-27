import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SocketEventNames } from '../SocketEventNames.enum';
import { ReceiveDataEventDto } from './receive-data-event.dto';

@Injectable()
@WebSocketGateway({ cors: true })
export class ReceiveDataEventGateway {
  @WebSocketServer() server;

  @SubscribeMessage(SocketEventNames.SEND_DATA_EVENT)
  async handleUserSpeedEvent(
    @MessageBody() dto: ReceiveDataEventDto,
  ): Promise<ReceiveDataEventDto> {
    this.server.in(dto.roomId).emit(SocketEventNames.SEND_DATA_EVENT, dto.data);

    return dto;
  }
}
