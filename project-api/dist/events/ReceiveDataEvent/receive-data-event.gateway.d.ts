import { ReceiveDataEventDto } from './receive-data-event.dto';
import { Socket } from 'socket.io';
export declare class ReceiveDataEventGateway {
    server: any;
    handleUserSpeedEvent(dto: ReceiveDataEventDto, client: Socket): Promise<ReceiveDataEventDto>;
}
