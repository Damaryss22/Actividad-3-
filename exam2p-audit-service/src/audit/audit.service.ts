import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam2AuditLog } from './exam2-audit-log.entity';
import { WebhookEmitterService } from 'src/webhook/webhook-emitter.service';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Exam2AuditLog)
    private readonly auditoriaRepo: Repository<Exam2AuditLog>,
    private readonly webhookEmitterService: WebhookEmitterService,
  ) {}

  async registrarAuditoria(data: any) {
    const registro = this.auditoriaRepo.create({
      exam2p_entity: data.exam2p_entity,
      exam2p_recordId: data.exam2p_recordId,
      exam2p_user: data.exam2p_user,
      exam2p_action: 'DELETE', // 👈 EXACTO DEL EXAMEN
      exam2p_detail: data.exam2p_detail || 'Registro eliminado',
    });

    const auditoriaGuardada = await this.auditoriaRepo.save(registro);

    console.log('🧪 Acción guardada:', auditoriaGuardada.exam2p_action);

    if (auditoriaGuardada.exam2p_action === 'DELETE') {
      await this.webhookEmitterService.emitirEliminacion(auditoriaGuardada);
    }

    return auditoriaGuardada;
  }

  async obtenerAuditorias(limite?: number) {
    const query = this.auditoriaRepo
      .createQueryBuilder('auditoria')
      .orderBy('auditoria.exam2p_timestamp', 'DESC');

    if (limite) {
      query.take(limite);
    }

    return query.getMany();
  }


}
