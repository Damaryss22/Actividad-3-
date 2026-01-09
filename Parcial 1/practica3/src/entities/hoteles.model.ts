// src/entities/Hotel.ts
import { Entity, Column } from 'typeorm';
import { LugaresTuristicos } from './lugares_turisticos.model';

@Entity({ name: 'hoteles' })
export class Hotel extends LugaresTuristicos {
  @Column()
  clasificacion!: string;

  @Column()
  servicios_hotel!: string;

  mostrarServicios(): void {
    console.log(`🛎️ Servicios del hotel: ${this.servicios_hotel}`);
  }
}
