import { RmqContext } from '@nestjs/microservices';
import { AuditService } from './audit.service';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    handleRecordDeleted(data: any, context: RmqContext): Promise<void>;
    obtenerAuditorias(limit?: string): Promise<import("./exam2-audit-log.entity").Exam2AuditLog[]>;
}
