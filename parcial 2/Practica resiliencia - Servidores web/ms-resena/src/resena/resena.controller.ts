import { Controller, Inject, Post, Body } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
  ClientProxy,
} from '@nestjs/microservices';
import { IdempotencyGuard } from '../idempotency/idempotency.guard';
import { ResenaService } from './resena.service';

@Controller('resenas')
export class ResenaController {
  constructor(
    private readonly idempotencyGuard: IdempotencyGuard,
    private readonly resenaService: ResenaService,
    @Inject('USUARIO_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async createResena(@Body() body: { autor: string; destino: string; mensaje: string; calificacion: number; usuario_id: string }) {
    const resena = await this.resenaService.createResena(body);
    this.client.emit('resena.created', { 
      usuario_id: body.usuario_id, 
      destino: body.destino, 
      calificacion: body.calificacion 
    });
    return resena;
  }

  @EventPattern('resena.request')
  async handle(@Payload() payload: any, @Ctx() context: RmqContext) {
    console.log('📥 Procesando resena.request...');
    
    const channel = context.getChannelRef();
    const msg = context.getMessage();

    await this.idempotencyGuard.run(payload.message_id, async () => {
      await this.resenaService.createResena(payload.data);
      this.client.emit('resena.created', payload.data);
      console.log('✅ Reseña creada y evento emitido a ms-usuario');
    });

    channel.ack(msg);
  }
}
