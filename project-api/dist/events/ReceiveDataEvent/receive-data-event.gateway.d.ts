import { ReceiveDataEventDto } from './receive-data-event.dto';
import { Socket } from 'socket.io';
import { Cache } from 'cache-manager';
export declare class ReceiveDataEventGateway {
    private cacheManager;
    constructor(cacheManager: Cache);
    server: any;
    handleUserSpeedEvent(dto: ReceiveDataEventDto, socket: Socket): Promise<ReceiveDataEventDto>;
}
