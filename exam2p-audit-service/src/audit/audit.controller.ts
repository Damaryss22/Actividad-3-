import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import { RmqContext } from '@nestjs/microservices';
import { AuditService } from './audit.service';

@Controller()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  // 🟢 RabbitMQ (Pregunta 1) - EVENTO EXACTO DEL EXAMEN
  @EventPattern('exam2p.record.deleted')
  async handleRecordDeleted(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('🔍 Patrón recibido:', context.getPattern());
    console.log('📩 Evento recibido:', data);

    await this.auditService.registrarAuditoria(data);

    console.log('✅ Registro de auditoría guardado');
  }

  // 🟢 REST (Pregunta 3) - ENDPOINT EXACTO DEL EXAMEN
  @Get('exam2p-audit')
  async obtenerAuditorias(@Query('limit') limit?: string) {
    return this.auditService.obtenerAuditorias(
      limit ? Number(limit) : undefined,
    );
  }
}
