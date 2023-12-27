"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIoConfig = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketIoConfig extends platform_socket_io_1.IoAdapter {
    constructor(app) {
        super(app);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        const io = server.of('/');
        io.use((socket, next) => {
            const allowedOrigins = ['http://localhost:5173'];
            const origin = socket.handshake.headers.origin;
            if (allowedOrigins.includes(origin)) {
                return next();
            }
            return next(new Error('Origin not allowed by CORS'));
        });
        return server;
    }
}
exports.SocketIoConfig = SocketIoConfig;
//# sourceMappingURL=webSocketAdapeter.js.map