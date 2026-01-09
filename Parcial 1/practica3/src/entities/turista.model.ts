import { Usuario } from "./usuario.model";
import { Resena } from "./Resena";
import { LugaresTuristicos } from "./lugares_turisticos.model";
import { Restaurante } from "./restaurantes.model";
import { MedioTransporte } from "./MedioTransporte";
// ...existing code...

export interface Turista extends Usuario {
  preferencias: string[];

  verLugares(): LugaresTuristicos[];
  verRestaurantes(): Restaurante[];
  verTransportes(): MedioTransporte[]; 
  verRecomendaciones(): any[];
  aplicarFiltros(): void;
  escribirResena(resena: Resena): void;
}
