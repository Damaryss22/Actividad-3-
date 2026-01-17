import { Injectable, Logger } from '@nestjs/common';

export interface WebhookPayload {
  evento: string;
  timestamp: string;
  data: any;
  metadata?: {
    source: string;
    environment: string;
    correlation_id: string;
  };
}

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  private readonly n8nWebhookUrls: string[] = [];

  constructor() {
    // Configurar URLs de n8n desde variables de entorno
    const url1 = process.env.N8N_WEBHOOK_URL_1 || '';
    const url2 = process.env.N8N_WEBHOOK_URL_2 || '';
    const url3 = process.env.N8N_WEBHOOK_URL_3 || '';

    this.n8nWebhookUrls = [url1, url2, url3].filter((url) => url.length > 0);

    this.logger.log('🔧 Webhook Service configurado para ms-usuario');
    this.logger.log(`   URLs configuradas: ${this.n8nWebhookUrls.length}`);
  }

  /**
   * Emite un evento a n8n
   * @param evento - Nombre del evento (ej: usuario.creado)
   * @param payload - Datos del evento
   */
  async emit(evento: string, payload: any): Promise<void> {
    if (this.n8nWebhookUrls.length === 0) {
      this.logger.warn('⚠️ No hay URLs de n8n configuradas');
      return;
    }

    const webhookPayload: WebhookPayload = {
      evento,
      timestamp: new Date().toISOString(),
      data: payload,
      metadata: {
        source: 'ms-usuario',
        environment: process.env.NODE_ENV || 'development',
        correlation_id: this.generateCorrelationId(),
      },
    };

    this.logger.log(`📤 Emitiendo evento: ${evento}`);

    // Enviar a todas las URLs en paralelo
    const promises = this.n8nWebhookUrls.map((url) =>
      this.sendToUrl(url, webhookPayload),
    );

    await Promise.allSettled(promises);
  }

  /**
   * Envía el webhook a una URL específica
   */
  private async sendToUrl(url: string, payload: WebhookPayload): Promise<void> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        this.logger.log(`✅ Webhook enviado exitosamente a ${this.truncateUrl(url)}`);
      } else {
        this.logger.warn(
          `⚠️ Webhook respondió con estado ${response.status}: ${this.truncateUrl(url)}`,
        );
      }
    } catch (error) {
      this.logger.error(`❌ Error enviando webhook a ${this.truncateUrl(url)}: ${error.message}`);
    }
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  private truncateUrl(url: string): string {
    if (url.length <= 50) return url;
    return url.substring(0, 47) + '...';
  }
}
