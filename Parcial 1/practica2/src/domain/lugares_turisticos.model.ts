export interface LugaresTuristicos {
  id: number;
  nombre_lugar: string;
  ubicacion: string;
  descripcion: string;

  mostrarInformacion(): void;
  verUbicacion(): void;
}
