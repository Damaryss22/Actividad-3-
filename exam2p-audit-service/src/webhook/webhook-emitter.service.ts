import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhookEmitterService {
  private readonly logger = new Logger(WebhookEmitterService.name);

  // 👇 Usar webhook real de n8n (necesitas crearlo primero en n8n)
  // O usa un servicio de prueba como webhook.site temporalmente
  private readonly N8N_WEBHOOK_URL =
    'http://localhost:5678/webhook-test/exam2p-audit-deletion';

  async emitirEliminacion(auditoria: any) {
    const payload = {
      event: 'exam2p.audit.deletion', // 👈 EXACTO DEL EXAMEN
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
      await axios.post(this.N8N_WEBHOOK_URL, payload);
      this.logger.log('Webhook enviado a n8n'); // 👈 LOG EXACTO DEL EXAMEN
    } catch (error) {
      this.logger.error('Error enviando webhook', error.message);
    }
  }
}
