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
exports.AuditController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const microservices_2 = require("@nestjs/microservices");
const audit_service_1 = require("./audit.service");
let AuditController = class AuditController {
    auditService;
    constructor(auditService) {
        this.auditService = auditService;
    }
    async handleRecordDeleted(data, context) {
        console.log('🔍 Patrón recibido:', context.getPattern());
        console.log('📩 Evento recibido:', data);
        await this.auditService.registrarAuditoria(data);
        console.log('✅ Registro de auditoría guardado');
    }
    async obtenerAuditorias(limit) {
        return this.auditService.obtenerAuditorias(limit ? Number(limit) : undefined);
    }
};
exports.AuditController = AuditController;
__decorate([
    (0, microservices_1.EventPattern)('exam2p.record.deleted'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_2.RmqContext]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "handleRecordDeleted", null);
__decorate([
    (0, common_1.Get)('exam2p-audit'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "obtenerAuditorias", null);
exports.AuditController = AuditController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [audit_service_1.AuditService])
], AuditController);
//# sourceMappingURL=audit.controller.js.map