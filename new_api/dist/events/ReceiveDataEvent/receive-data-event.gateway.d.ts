import { ReceiveDataEventDto } from './receive-data-event.dto';
export declare class ReceiveDataEventGateway {
    server: any;
    handleUserSpeedEvent(dto: ReceiveDataEventDto): Promise<ReceiveDataEventDto>;
}
