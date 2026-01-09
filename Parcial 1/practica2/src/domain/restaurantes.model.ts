import { LugaresTuristicos } from "./lugares_turisticos.model";

export interface Restaurantes extends LugaresTuristicos {
  id: number;
  tipoComida: string;

  publicarMenu(): void;
}
