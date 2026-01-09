import { Turista } from "../entities/turista.model";
import { Resena } from "../entities/Resena";
import { LugaresTuristicos } from "../entities/lugares_turisticos.model";
import { Restaurante } from "../entities/restaurantes.model";
import { MedioTransporte } from "../entities/MedioTransporte";

const turistas: Turista[] = [];
export class CrudTurista {
  constructor() {}

  async create(
    nuevo: Omit<
      Turista,
      | "id"
      | "verLugares"
      | "verRestaurantes"
      | "verTransportes"
      | "verRecomendaciones"
      | "aplicarFiltros"
      | "escribirResena"
    >
  ): Promise<Turista> {
    if (
      !nuevo.nombre ||
      !nuevo.correo ||
      !nuevo.contraseña ||
      !nuevo.tipo ||
      !nuevo.idiomaPreferido ||
      !nuevo.preferencias
    ) {
      throw new Error("Faltan campos obligatorios");
    }

    const turista: Turista = {
      id: turistas.length + 1,
      nombre: nuevo.nombre,
      correo: nuevo.correo,
      contraseña: nuevo.contraseña,
      tipo: nuevo.tipo,
      idiomaPreferido: nuevo.idiomaPreferido,
      preferencias: nuevo.preferencias,

      iniciarSesion: () => {
        console.log(`${nuevo.nombre} ha iniciado sesión.`);
      },
      cerrarSesion: () => {
        console.log(`${nuevo.nombre} ha cerrado sesión.`);
      },
      cambiarIdioma: (nuevoIdioma: string) => {
        console.log(`${nuevo.nombre} cambió el idioma a ${nuevoIdioma}.`);
      },

      verLugares: () => {
        console.log(`${nuevo.nombre} ve lugares turísticos.`);
        return [] as LugaresTuristicos[];
      },
      verRestaurantes: () => {
        console.log(`${nuevo.nombre} ve restaurantes.`);
        return [] as Restaurante[];
      },
      verTransportes: () => {
        console.log(`${nuevo.nombre} ve transportes.`);
        return [] as MedioTransporte[];
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
    return turista;
  }

  async findAll(): Promise<Turista[]> {
    return turistas;
  }

  async findOne(id: number): Promise<Turista> {
    const turista = turistas.find(t => t.id === id);
    if (!turista) throw new Error("Turista no encontrado");
    return turista;
  }

  async update(
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
    const idx = turistas.findIndex(t => t.id === id);
    if (idx === -1) {
      throw new Error("Turista no encontrado");
    }

    const turista = turistas[idx];

    if (datos.nombre !== undefined) turista.nombre = datos.nombre;
    if (datos.correo !== undefined) turista.correo = datos.correo;
    if (datos.contraseña !== undefined) turista.contraseña = datos.contraseña;
    if (datos.tipo !== undefined) turista.tipo = datos.tipo;
    if (datos.idiomaPreferido !== undefined) turista.idiomaPreferido = datos.idiomaPreferido;
    if (datos.preferencias !== undefined) turista.preferencias = datos.preferencias;

    return turista;
  }

  async remove(id: number): Promise<string> {
    const idx = turistas.findIndex(t => t.id === id);
    if (idx === -1) throw new Error("Turista no encontrado");
    turistas.splice(idx, 1);
    return "Turista eliminado correctamente";
  }
}
