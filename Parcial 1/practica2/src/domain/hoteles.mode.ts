import { LugaresTuristicos } from "./lugares_turisticos.model";

export interface Hoteles extends LugaresTuristicos {
  id: number;
  clasificacion: string;
  servicios_hotel: string;
}
