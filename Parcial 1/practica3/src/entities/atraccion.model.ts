import { Entity } from 'typeorm';
import { LugaresTuristicos } from './lugares_turisticos.model';

@Entity({ name: 'atracciones' })
export class Atraccion extends LugaresTuristicos {

  mostrarTipo(): void {
    console.log(`🎡 Atracción turística: ${this.nombre_lugar}`);
  }
}
