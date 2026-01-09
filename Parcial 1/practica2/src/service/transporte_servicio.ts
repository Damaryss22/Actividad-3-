import { Transporte } from "../domain/transporte.model";

const transportes: Transporte[] = [];

export class CrudTransporte {

  mostrar(id: number): Transporte {
    const transporte = transportes.find((t) => t.id === id);
    if (!transporte) {
      throw new Error("No se encontró el transporte");
    }
    return transporte;
  }

  eliminar(id: number, callback: (err: string | null, msg?: string) => void): void {
    const idx = transportes.findIndex((t) => t.id === id);
    if (idx === -1) {
      callback("Transporte no encontrado");
      return;
    }
    transportes.splice(idx, 1);
    callback(null, "Transporte eliminado correctamente");
  }

  crear(nuevoTransporte: Omit<Transporte, "id">): Transporte {
    const transporte: Transporte = {
      id: transportes.length + 1,
      ...nuevoTransporte,
    };
    transportes.push(transporte);
    return transporte;
  }

  actualizar(id: number, nuevoTransporte: Transporte): Promise<Transporte> {
    return new Promise<Transporte>((resolve, reject) => {
      setTimeout(() => {
        const idx = transportes.findIndex((t) => t.id === id);
        if (idx === -1) {
          return reject(new Error("Transporte no encontrado"));
        }
        transportes[idx] = { ...nuevoTransporte, id };
        resolve(transportes[idx]);
      }, 1000);
    });
  }
}
