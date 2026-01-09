import { Column, Entity } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { LugaresTuristico } from '../../lugares-turisticos/entities/lugares-turistico.entity';
import { Restaurante } from '../../restaurante/entities/restaurante.entity';
import { MedioTransporte } from '../../medio-transporte/entities/medio-transporte.entity';
import { Resena } from '../../resena/entities/resena.entity';

@Entity()
export class Turista extends Usuario {
  @Column('simple-array')
  preferencias!: string[];


  verLugares(): LugaresTuristico[] {
    console.log(`${this.nombre} está viendo lugares turísticos.`);
    return []; 
  }

  verRestaurantes(): Restaurante[] {
    console.log(`${this.nombre} está viendo restaurantes.`);
    return [];
  }

  verTransportes(): MedioTransporte[] {
    console.log(`${this.nombre} está viendo medios de transporte.`);
    return [];
  }

  verRecomendaciones(): any[] {
    console.log(`${this.nombre} está viendo recomendaciones personalizadas.`);
    return [];
  }

  aplicarFiltros(): void {
    console.log(`${this.nombre} aplicó filtros de búsqueda.`);
  }

  escribirResena(resena: Resena): void {
    console.log(`${this.nombre} escribió una reseña sobre ${resena.destino}.`);
  }
}
