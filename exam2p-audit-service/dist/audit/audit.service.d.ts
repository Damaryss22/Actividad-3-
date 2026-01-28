import { Repository } from 'typeorm';
import { Exam2AuditLog } from './exam2-audit-log.entity';
import { WebhookEmitterService } from 'src/webhook/webhook-emitter.service';
export declare class AuditService {
    private readonly auditoriaRepo;
    private readonly webhookEmitterService;
    constructor(auditoriaRepo: Repository<Exam2AuditLog>, webhookEmitterService: WebhookEmitterService);
    registrarAuditoria(data: any): Promise<Exam2AuditLog>;
    obtenerAuditorias(limite?: number): Promise<Exam2AuditLog[]>;
}
