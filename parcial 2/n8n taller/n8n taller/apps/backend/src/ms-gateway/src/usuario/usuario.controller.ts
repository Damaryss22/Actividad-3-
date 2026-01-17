import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    @Inject('USUARIO_PUBLISHER') private readonly usuarioClient: ClientProxy,
  ) {}

  @Post()
  async createUsuario(@Body() body: { nombre: string; correo: string; contrasena?: string; tipo?: string; idiomaPreferido?: string }) {
    const message_id = uuidv4();
    const usuario_id = Date.now();

    // Emitir a RabbitMQ (opcional)
    this.usuarioClient.emit('usuario.create', {
      message_id,
      data: body,
    });

    console.log(`👤 PUBLISHED usuario.create - message_id: ${message_id}`);

    // ✅ ENVIAR WEBHOOK A N8N
    const webhookData = {
      evento: 'usuario.creado',
      data: {
        usuario_id,
        nombre: body.nombre,
        correo: body.correo,
        tipo: body.tipo || 'turista',
      },
      timestamp: new Date().toISOString(),
      metadata: {
        source: 'ms-usuario',
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

    return { 
      success: true,
      message: 'Usuario creado y webhooks enviados',
      usuario_id,
      message_id,
    };
  }
}
