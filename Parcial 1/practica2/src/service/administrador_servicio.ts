import { Administrador } from "../domain/administrador.model";

const administradores: Administrador[] = [];

export class CrudAdministrador {
  constructor() {}

  crear(
    nuevo: Omit<Administrador, "id" | "gestionarUsuario" | "eliminarContenido">,
    callback: (err: string | null, admin?: Administrador) => void
  ): void {
    setTimeout(() => {
      if (!nuevo.nombre || !nuevo.correo) {
        callback("Faltan campos obligatorios");
        return;
      }

      const admin: Administrador = {
        id: administradores.length + 1,
        nombre: nuevo.nombre,
        correo: nuevo.correo,
        gestionarUsuario: () => {
          console.log(`${nuevo.nombre} gestionó un usuario`);
        },
        eliminarContenido: () => {
          console.log(`${nuevo.nombre} eliminó contenido`);
        },
      };

      administradores.push(admin);
      callback(null, admin);
    }, 300);
  }

  mostrar(id: number): Promise<Administrador> {
    return new Promise((resolve, reject) => {
      const admin = administradores.find(a => a.id === id);
      setTimeout(() => {
        if (!admin) reject(new Error("Administrador no encontrado"));
        else resolve(admin);
      }, 300);
    });
  }

  actualizar(
    id: number,
    datos: Partial<Omit<Administrador, "id" | "gestionarUsuario" | "eliminarContenido">>
  ): Promise<Administrador> {
    return new Promise((resolve, reject) => {
      const idx = administradores.findIndex(a => a.id === id);
      setTimeout(() => {
        if (idx === -1) {
          reject(new Error("Administrador no encontrado"));
          return;
        }

        const admin = administradores[idx];
        if (datos.nombre) admin.nombre = datos.nombre;
        if (datos.correo) admin.correo = datos.correo;

        resolve(admin);
      }, 300);
    });
  }

  eliminar(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const idx = administradores.findIndex(a => a.id === id);
      setTimeout(() => {
        if (idx === -1) reject("Administrador no encontrado");
        else {
          administradores.splice(idx, 1);
          resolve("Administrador eliminado correctamente");
        }
      }, 300);
    });
  }

  listar(): Promise<Administrador[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(administradores), 300);
    });
  }

  gestionarUsuario(id: number): void {
    const admin = administradores.find(a => a.id === id);
    if (admin) admin.gestionarUsuario();
    else console.error("Administrador no encontrado");
  }

  eliminarContenido(id: number): void {
    const admin = administradores.find(a => a.id === id);
    if (admin) admin.eliminarContenido();
    else console.error("Administrador no encontrado");
  }
}
