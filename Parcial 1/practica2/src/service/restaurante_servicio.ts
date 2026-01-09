import { Restaurantes } from "../domain/restaurantes.model";

const restaurantes: Restaurantes[] = [];

export class CrudRestaurantes {
  constructor() {}

  crear(
    nuevo: Omit<Restaurantes, "id" | "publicarMenu">,
    callback: (err: string | null, restaurante?: Restaurantes) => void
  ): void {
    setTimeout(() => {
      if (!nuevo.nombre || !nuevo.ubicacion || !nuevo.descripcion || !nuevo.tipoComida) {
        callback("Faltan campos obligatorios");
        return;
      }

      const restaurante: Restaurantes = {
        ...nuevo,
        id: restaurantes.length + 1,
        publicarMenu: () => {
          console.log(`Menú publicado para ${nuevo.nombre}`);
        }
      };

      restaurantes.push(restaurante);
      callback(null, restaurante);
    }, 300);
  }

  mostrar(id: number): Promise<Restaurantes> {
    return new Promise((resolve, reject) => {
      const restaurante = restaurantes.find(r => r.id === id);
      setTimeout(() => {
        if (!restaurante) reject(new Error("Restaurante no encontrado"));
        else resolve(restaurante);
      }, 300);
    });
  }

  actualizar(
    id: number,
    datos: Partial<Omit<Restaurantes, "id" | "publicarMenu">>
  ): Promise<Restaurantes> {
    return new Promise((resolve, reject) => {
      const idx = restaurantes.findIndex(r => r.id === id);
      setTimeout(() => {
        if (idx === -1) {
          reject(new Error("Restaurante no encontrado"));
          return;
        }

        restaurantes[idx] = {
          ...restaurantes[idx],
          ...datos
        };

        resolve(restaurantes[idx]);
      }, 300);
    });
  }

  eliminar(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const idx = restaurantes.findIndex(r => r.id === id);
      setTimeout(() => {
        if (idx === -1) reject("Restaurante no encontrado");
        else {
          restaurantes.splice(idx, 1);
          resolve("Restaurante eliminado correctamente");
        }
      }, 300);
    });
  }

  listar(): Promise<Restaurantes[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(restaurantes), 300);
    });
  }

  publicarMenu(id: number): void {
    const restaurante = restaurantes.find(r => r.id === id);
    if (!restaurante) {
      console.error("Restaurante no encontrado");
      return;
    }
    restaurante.publicarMenu();
  }
}
