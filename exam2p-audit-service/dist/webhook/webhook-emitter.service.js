"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WebhookEmitterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookEmitterService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let WebhookEmitterService = WebhookEmitterService_1 = class WebhookEmitterService {
    logger = new common_1.Logger(WebhookEmitterService_1.name);
    N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/exam2p-audit-deletion';
    async emitirEliminacion(auditoria) {
        const payload = {
            event: 'exam2p.audit.deletion',
            timestamp: auditoria.exam2p_timestamp || new Date().toISOString(),
            data: {
                logId: auditoria.logId,
                exam2p_entity: auditoria.exam2p_entity,
                exam2p_recordId: auditoria.exam2p_recordId,
                exam2p_user: auditoria.exam2p_user,
                exam2p_action: auditoria.exam2p_action,
                exam2p_detail: auditoria.exam2p_detail,
            },
        };
        try {
            await axios_1.default.post(this.N8N_WEBHOOK_URL, payload);
            this.logger.log('Webhook enviado a n8n');
        }
        catch (error) {
            this.logger.error('Error enviando webhook', error.message);
        }
    }
};
exports.WebhookEmitterService = WebhookEmitterService;
exports.WebhookEmitterService = WebhookEmitterService = WebhookEmitterService_1 = __decorate([
    (0, common_1.Injectable)()
], WebhookEmitterService);
//# sourceMappingURL=webhook-emitter.service.js.map