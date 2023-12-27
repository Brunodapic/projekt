"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRoomEventGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
const SocketEventNames_enum_1 = require("../SocketEventNames.enum");
let JoinRoomEventGateway = class JoinRoomEventGateway {
    handleRoomJoinEvent(dto, socket) {
        console.log(dto);
        const roomId = dto.roomId;
        if (roomId && !socket.rooms.has(roomId)) {
            socket.join(roomId);
        }
        console.log(roomId);
        this.server.in(roomId).emit(SocketEventNames_enum_1.SocketEventNames.JOIN_ROOM_EVENT, 'JOIN');
        return dto;
    }
};
exports.JoinRoomEventGateway = JoinRoomEventGateway;
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", Object)
], JoinRoomEventGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(SocketEventNames_enum_1.SocketEventNames.JOIN_ROOM_EVENT),
    __param(0, (0, decorators_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Object)
], JoinRoomEventGateway.prototype, "handleRoomJoinEvent", null);
exports.JoinRoomEventGateway = JoinRoomEventGateway = __decorate([
    (0, decorators_1.WebSocketGateway)({ cors: true })
], JoinRoomEventGateway);
//# sourceMappingURL=join-room-event.gateway.js.map