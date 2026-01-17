import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Controller('resenas')
export class ResenaController {
  constructor(
    @Inject('RESENA_PUBLISHER') private readonly resenaClient: ClientProxy,
  ) {}

  @Post()
  async createResena(@Body() body: { autor: string; destino: string; comentario?: string; calificacion: number }) {
    const message_id = uuidv4();
    const resena_id = Date.now();

    // Emitir a RabbitMQ (opcional)
    this.resenaClient.emit('resena.request', {
      message_id,
      data: body,
    });

    console.log(`📤 PUBLISHED resena.request - message_id: ${message_id}`);

    // ✅ ENVIAR WEBHOOK A N8N
    const webhookData = {
      evento: body.calificacion <= 2 ? 'resena.calificacion_baja' : 'resena.creada',
      data: {
        resena_id,
        destino: body.destino,
        calificacion: body.calificacion,
        comentario: body.comentario || '',
        autor: body.autor,
      },
      timestamp: new Date().toISOString(),
      metadata: {
        source: 'ms-gateway',
        message_id,
      },
    };

    // Enviar a Workflow 1 (Notificación)
    try {
      const response1 = await fetch('http://localhost:5678/webhook/tourist-event-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData),
      });
      console.log(`✅ Webhook enviado a Workflow 1 - Status: ${response1.status}`);
    } catch (error) {
      console.error('❌ Error enviando webhook a Workflow 1:', error.message);
    }

    // Enviar a Workflow 2 (Google Sheets)
    try {
      const response2 = await fetch('http://localhost:5678/webhook/sheets-sync-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData),
      });
      console.log(`✅ Webhook enviado a Workflow 2 - Status: ${response2.status}`);
    } catch (error) {
      console.error('❌ Error enviando webhook a Workflow 2:', error.message);
    }

    // Enviar a Workflow 3 (Alertas) solo si es crítico
    if (body.calificacion <= 2) {
      try {
        const response3 = await fetch('http://localhost:5678/webhook/alert-workflow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookData),
        });
        console.log(`✅ Webhook enviado a Workflow 3 (Alerta) - Status: ${response3.status}`);
      } catch (error) {
        console.error('❌ Error enviando webhook a Workflow 3:', error.message);
      }
    }

    return { 
      success: true,
      message: 'Reseña creada y webhooks enviados',
      resena_id,
      message_id,
      evento: webhookData.evento,
    };
  }
}
