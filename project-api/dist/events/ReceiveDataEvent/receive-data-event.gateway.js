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
exports.ReceiveDataEventGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const SocketEventNames_enum_1 = require("../SocketEventNames.enum");
let ReceiveDataEventGateway = class ReceiveDataEventGateway {
    async handleUserSpeedEvent(dto) {
        this.server.in(dto.roomId).emit(SocketEventNames_enum_1.SocketEventNames.SEND_DATA_EVENT, dto.data);
        return dto;
    }
};
exports.ReceiveDataEventGateway = ReceiveDataEventGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], ReceiveDataEventGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(SocketEventNames_enum_1.SocketEventNames.SEND_DATA_EVENT),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReceiveDataEventGateway.prototype, "handleUserSpeedEvent", null);
exports.ReceiveDataEventGateway = ReceiveDataEventGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({ cors: true })
], ReceiveDataEventGateway);
//# sourceMappingURL=receive-data-event.gateway.js.map