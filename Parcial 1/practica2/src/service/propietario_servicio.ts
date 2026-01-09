import { Propietario } from "./domain/propietario.model";

const propietarios: Propietario[] = [];

export class CrudPropietario {
  constructor() {}

  crear(
    nuevo: Omit<Propietario, "id">,
    callback: (err: string | null, creado?: Propietario) => void
  ): void {
    setTimeout(() => {
      if (!nuevo.tipo_negocio) {
        callback("El campo 'tipo_negocio' es obligatorio");
        return;
      }

      const nuevoPropietario: Propietario = {
        id: propietarios.length + 1,
        tipo_negocio: nuevo.tipo_negocio,
      };

      propietarios.push(nuevoPropietario);
      callback(null, nuevoPropietario);
    }, 300);
  }

  mostrar(id: number): Promise<Propietario> {
    return new Promise((resolve, reject) => {
      const propietario = propietarios.find(p => p.id === id);
      setTimeout(() => {
        if (!propietario) reject(new Error("Propietario no encontrado"));
        else resolve(propietario);
      }, 300);
    });
  }

  actualizar(
    id: number,
    datos: Partial<Omit<Propietario, "id">>
  ): Promise<Propietario> {
    return new Promise((resolve, reject) => {
      const index = propietarios.findIndex(p => p.id === id);
      setTimeout(() => {
        if (index === -1) {
          reject(new Error("Propietario no encontrado"));
          return;
        }
        propietarios[index] = { ...propietarios[index], ...datos };
        resolve(propietarios[index]);
      }, 300);
    });
  }

  eliminar(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const index = propietarios.findIndex(p => p.id === id);
      setTimeout(() => {
        if (index === -1) reject("Propietario no encontrado");
        else {
          propietarios.splice(index, 1);
          resolve("Propietario eliminado correctamente");
        }
      }, 300);
    });
  }

  listar(): Promise<Propietario[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(propietarios), 300);
    });
  }
}
