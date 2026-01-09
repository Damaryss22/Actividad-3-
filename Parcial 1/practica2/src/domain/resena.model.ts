export interface Resena {
  id: number;
  autor: string;
  destino: string;
  mensaje: string;
  fecha: Date;
  fotos: string[];

  publicar(): void;
}
