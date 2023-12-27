import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';
import { INestApplication } from '@nestjs/common';
export declare class SocketIoConfig extends IoAdapter {
    constructor(app: INestApplication);
    createIOServer(port: number, options?: socketio.ServerOptions): socketio.Server;
}
