import { ReceiveDataEventDto } from './receive-data-event.dto';
import { Socket } from 'socket.io';
export declare class ReceiveDataEventGateway {
    server: any;
    handleUserSpeedEvent(dto: ReceiveDataEventDto, socket: Socket): Promise<ReceiveDataEventDto>;
}
