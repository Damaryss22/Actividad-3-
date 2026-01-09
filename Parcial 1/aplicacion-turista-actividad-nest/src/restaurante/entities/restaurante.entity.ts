import { Entity, Column } from 'typeorm';
import { LugaresTuristico } from '../../lugares-turisticos/entities/lugares-turistico.entity';

@Entity({ name: 'restaurantes' })
export class Restaurante extends LugaresTuristico {
  @Column()
  tipoComida!: string;

  publicarMenu(): void {
    console.log(`📜 Menú del restaurante de comida ${this.tipoComida}`);
  }
}
