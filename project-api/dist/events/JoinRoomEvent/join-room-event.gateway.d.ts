import { Socket } from 'socket.io';
import { JoinRoomEventDto } from './join-room-event.dto';
export declare class JoinRoomEventGateway {
    server: any;
    handleRoomJoinEvent(dto: JoinRoomEventDto, socket: Socket): JoinRoomEventDto;
}
