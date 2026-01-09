import { Entity } from 'typeorm';
import { LugaresTuristico } from '../../lugares-turisticos/entities/lugares-turistico.entity';

@Entity({ name: 'atracciones' })
export class Atraccion extends LugaresTuristico {
  mostrarTipo(): void {
    console.log(`🎡 Atracción turística: ${this.nombre_lugar}`);
  }
}
