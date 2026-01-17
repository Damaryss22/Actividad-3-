import { Repository } from "typeorm";
import { Resena } from "./resena.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class ResenaService {
    constructor(
      @InjectRepository(Resena)
      private readonly repo: Repository<Resena>,
      private readonly webhookService: WebhookService,
    ) {}

    async createResena(data) {
      const resena = this.repo.create({
        autor: data.autor,
        destino: data.destino,
        mensaje: data.mensaje,
        calificacion: data.calificacion,
        usuario_id: data.usuario_id,
      });
      const savedResena = await this.repo.save(resena);
      
      // NUEVO: Emitir evento a n8n
      await this.webhookService.emit('resena.creada', {
        resena_id: savedResena.id,
        autor: savedResena.autor,
        destino: savedResena.destino,
        mensaje: savedResena.mensaje,
        calificacion: savedResena.calificacion,
        usuario_id: savedResena.usuario_id,
        fecha_creacion: new Date().toISOString(),
      });
      
      // Evaluar si es calificación baja (crítica)
      if (savedResena.calificacion < 3) {
        await this.webhookService.emit('resena.calificacion_baja', {
          resena_id: savedResena.id,
          autor: savedResena.autor,
          destino: savedResena.destino,
          mensaje: savedResena.mensaje,
          calificacion: savedResena.calificacion,
          usuario_id: savedResena.usuario_id,
          nivel_urgencia: savedResena.calificacion === 1 ? 'alta' : 'media',
          fecha_creacion: new Date().toISOString(),
        });
      }
      
      return savedResena;
    }

    async findAll(): Promise<Resena[]> {
      return this.repo.find();
    }
}
