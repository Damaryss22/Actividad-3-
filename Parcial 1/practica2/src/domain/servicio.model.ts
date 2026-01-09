export interface Servicio {
  id: number;
  descripcion: string;
  tipo_servicio: string;
  horario: string;
  precio: string;

  mostrarInformacion(): void;
}
