import { Entity, Column } from 'typeorm';
import { LugaresTuristicos } from './lugares_turisticos.model';

@Entity({ name: 'restaurantes' })
export class Restaurante extends LugaresTuristicos {
  @Column()
  tipoComida!: string;

  publicarMenu(): void {
    console.log(`📜 Menú del restaurante de comida ${this.tipoComida}`);
  }
}
