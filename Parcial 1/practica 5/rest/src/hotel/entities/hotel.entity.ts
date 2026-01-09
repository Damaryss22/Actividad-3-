import { Entity, Column } from 'typeorm';
import { LugaresTuristico } from '../../lugares-turisticos/entities/lugares-turistico.entity';

@Entity({ name: 'hoteles' })
export class Hotel extends LugaresTuristico {
  @Column()
  clasificacion!: string;

  @Column()
  servicios_hotel!: string;

  mostrarServicios(): void {
    console.log(`🛎️ Servicios del hotel: ${this.servicios_hotel}`);
  }
}
