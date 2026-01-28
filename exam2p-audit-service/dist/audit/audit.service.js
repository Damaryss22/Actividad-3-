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
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exam2_audit_log_entity_1 = require("./exam2-audit-log.entity");
const webhook_emitter_service_1 = require("../webhook/webhook-emitter.service");
let AuditService = class AuditService {
    auditoriaRepo;
    webhookEmitterService;
    constructor(auditoriaRepo, webhookEmitterService) {
        this.auditoriaRepo = auditoriaRepo;
        this.webhookEmitterService = webhookEmitterService;
    }
    async registrarAuditoria(data) {
        const registro = this.auditoriaRepo.create({
            exam2p_entity: data.exam2p_entity,
            exam2p_recordId: data.exam2p_recordId,
            exam2p_user: data.exam2p_user,
            exam2p_action: 'DELETE',
            exam2p_detail: data.exam2p_detail || 'Registro eliminado',
        });
        const auditoriaGuardada = await this.auditoriaRepo.save(registro);
        console.log('🧪 Acción guardada:', auditoriaGuardada.exam2p_action);
        if (auditoriaGuardada.exam2p_action === 'DELETE') {
            await this.webhookEmitterService.emitirEliminacion(auditoriaGuardada);
        }
        return auditoriaGuardada;
    }
    async obtenerAuditorias(limite) {
        const query = this.auditoriaRepo
            .createQueryBuilder('auditoria')
            .orderBy('auditoria.exam2p_timestamp', 'DESC');
        if (limite) {
            query.take(limite);
        }
        return query.getMany();
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exam2_audit_log_entity_1.Exam2AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        webhook_emitter_service_1.WebhookEmitterService])
], AuditService);
//# sourceMappingURL=audit.service.js.map