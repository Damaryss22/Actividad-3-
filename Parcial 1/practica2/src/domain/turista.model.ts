import { Usuario } from "./usuario.model";
import { Resena } from "./resena.model";
import { LugaresTuristicos } from "./lugares_turisticos.model";
import { Restaurantes } from "./restaurantes.model";
import { Transporte } from "./transporte.model";

export interface Turista extends Usuario {
  preferencias: string[];

  verLugares(): LugaresTuristicos[];
  verRestaurantes(): Restaurantes[];
  verTransportes(): Transporte[];
  verRecomendaciones(): any[];
  aplicarFiltros(): void;
  escribirResena(resena: Resena): void;
}

