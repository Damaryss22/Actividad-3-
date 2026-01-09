import { Turista } from "../domain/turista.model";
import { Resena } from "../domain/resena.model";
import { LugaresTuristicos } from "../domain/lugares_turisticos.model";
import { Restaurantes } from "../domain/restaurantes.model";
import { Transporte } from "../domain/transporte.model";

const turistas: Turista[] = [];

export class CrudTurista {
  constructor() {}

  crear(
    nuevo: Omit<
      Turista,
      | "id"
      | "verLugares"
      | "verRestaurantes"
      | "verTransportes"
      | "verRecomendaciones"
      | "aplicarFiltros"
      | "escribirResena"
    >,
    callback: (err: string | null, turista?: Turista) => void
  ): void {
    setTimeout(() => {
      if (
        !nuevo.nombre ||
        !nuevo.correo ||
        !nuevo.contraseña ||
        !nuevo.tipo ||
        !nuevo.idiomaPreferido ||
        !nuevo.preferencias
      ) {
        callback("Faltan campos obligatorios");
        return;
      }

      const turista: Turista = {
        id: turistas.length + 1,
        nombre: nuevo.nombre,
        correo: nuevo.correo,
        contraseña: nuevo.contraseña,
        tipo: nuevo.tipo,
        idiomaPreferido: nuevo.idiomaPreferido,
        preferencias: nuevo.preferencias,

        verLugares: () => {
          console.log(`${nuevo.nombre} ve lugares turísticos.`);
          return [] as LugaresTuristicos[];
        },
        verRestaurantes: () => {
          console.log(`${nuevo.nombre} ve restaurantes.`);
          return [] as Restaurantes[];
        },
        verTransportes: () => {
          console.log(`${nuevo.nombre} ve transportes.`);
          return [] as Transporte[];
        },
        verRecomendaciones: () => {
          console.log(`${nuevo.nombre} ve recomendaciones.`);
          return [];
        },
        aplicarFiltros: () => {
          console.log(`${nuevo.nombre} aplica filtros.`);
        },
        escribirResena: (resena: Resena) => {
          console.log(`${nuevo.nombre} escribió una reseña: ${resena.mensaje}`);
        },
      };

      turistas.push(turista);
      callback(null, turista);
    }, 300);
  }

  mostrar(id: number): Promise<Turista> {
    return new Promise((resolve, reject) => {
      const turista = turistas.find(t => t.id === id);
      setTimeout(() => {
        if (!turista) reject(new Error("Turista no encontrado"));
        else resolve(turista);
      }, 300);
    });
  }

  actualizar(
    id: number,
    datos: Partial<
      Omit<
        Turista,
        | "id"
        | "verLugares"
        | "verRestaurantes"
        | "verTransportes"
        | "verRecomendaciones"
        | "aplicarFiltros"
        | "escribirResena"
      >
    >
  ): Promise<Turista> {
    return new Promise((resolve, reject) => {
      const idx = turistas.findIndex(t => t.id === id);
      setTimeout(() => {
        if (idx === -1) {
          reject(new Error("Turista no encontrado"));
          return;
        }

        const turista = turistas[idx];

        if (datos.nombre !== undefined) turista.nombre = datos.nombre;
        if (datos.correo !== undefined) turista.correo = datos.correo;
        if (datos.contraseña !== undefined) turista.contraseña = datos.contraseña;
        if (datos.tipo !== undefined) turista.tipo = datos.tipo;
        if (datos.idiomaPreferido !== undefined) turista.idiomaPreferido = datos.idiomaPreferido;
        if (datos.preferencias !== undefined) turista.preferencias = datos.preferencias;

        resolve(turista);
      }, 300);
    });
  }

  eliminar(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const idx = turistas.findIndex(t => t.id === id);
      setTimeout(() => {
        if (idx === -1) reject("Turista no encontrado");
        else {
          turistas.splice(idx, 1);
          resolve("Turista eliminado correctamente");
        }
      }, 300);
    });
  }

  listar(): Promise<Turista[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(turistas), 300);
    });
  }
}
