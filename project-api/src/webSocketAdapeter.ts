import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';
import * as http from 'http';
import { INestApplication } from '@nestjs/common';

export class SocketIoConfig extends IoAdapter {
  constructor(app: INestApplication) {
    super(app);
  }

  createIOServer(
    port: number,
    options?: socketio.ServerOptions,
  ): socketio.Server {
    const server = super.createIOServer(port, options);

    const io = server.of('/');
    io.use((socket, next) => {
      const allowedOrigins = ['http://localhost:5173']; // Replace this with your allowed origin
      const origin = socket.handshake.headers.origin;
      if (allowedOrigins.includes(origin)) {
        return next();
      }
      return next(new Error('Origin not allowed by CORS'));
    });

    return server;
  }
}
