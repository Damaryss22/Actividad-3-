import { Atraccion } from "../domain/atraccion.model";

const atracciones: Atraccion[] = [];

export class CrudAtraccion {
  constructor() {}

  crear(
    nueva: Omit<Atraccion, "id">,
    callback: (err: string | null, atraccion?: Atraccion) => void
  ): void {
    setTimeout(() => {
      if (!nueva.nombre || !nueva.ubicacion || !nueva.descripcion) {
        callback("Faltan campos obligatorios para crear la atracción");
        return;
      }

      const atraccion: Atraccion = {
        id: atracciones.length + 1,
        ...nueva,
      };

      atracciones.push(atraccion);
      callback(null, atraccion);
    }, 300);
  }

  mostrar(id: number): Promise<Atraccion> {
    return new Promise((resolve, reject) => {
      const atraccion = atracciones.find(a => a.id === id);
      setTimeout(() => {
        if (!atraccion) reject(new Error("Atracción no encontrada"));
        else resolve(atraccion);
      }, 300);
    });
  }

  actualizar(
    id: number,
    datos: Partial<Omit<Atraccion, "id">>
  ): Promise<Atraccion> {
    return new Promise((resolve, reject) => {
      const idx = atracciones.findIndex(a => a.id === id);
      setTimeout(() => {
        if (idx === -1) {
          reject(new Error("Atracción no encontrada"));
          return;
        }
        atracciones[idx] = { ...atracciones[idx], ...datos };
        resolve(atracciones[idx]);
      }, 300);
    });
  }

  eliminar(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const idx = atracciones.findIndex(a => a.id === id);
      setTimeout(() => {
        if (idx === -1) reject("Atracción no encontrada");
        else {
          atracciones.splice(idx, 1);
          resolve("Atracción eliminada correctamente");
        }
      }, 300);
    });
  }

  listar(): Promise<Atraccion[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(atracciones), 300);
    });
  }
}
