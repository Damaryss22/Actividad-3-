import { AppDataSource } from "../data-source";
import { LugaresTuristicos } from "../entities/lugares_turisticos.model";
import { Repository } from "typeorm";

export class LugaresTuristicosService {
  private repository: Repository<LugaresTuristicos>;

  constructor() {
    this.repository = AppDataSource.getRepository(LugaresTuristicos);
  }

  async crear(nuevo: Omit<LugaresTuristicos, "id">): Promise<LugaresTuristicos> {
    if (!nuevo.nombre_lugar || !nuevo.ubicacion || !nuevo.descripcion) {
      throw new Error("Faltan campos obligatorios para crear un lugar turístico");
    }
    const lugar = this.repository.create(nuevo);
    return await this.repository.save(lugar);
  }

  async mostrar(id: number): Promise<LugaresTuristicos> {
    const lugar = await this.repository.findOneBy({ id });
    if (!lugar) {
      throw new Error("Lugar turístico no encontrado");
    }
    return lugar;
  }

  async actualizar(
    id: number,
    datos: Partial<Omit<LugaresTuristicos, "id">>
  ): Promise<LugaresTuristicos> {
    const lugar = await this.mostrar(id);
    Object.assign(lugar, datos);
    return await this.repository.save(lugar);
  }

  async eliminar(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error("Lugar turístico no encontrado");
    }
  }

  async listar(): Promise<LugaresTuristicos[]> {
    return await this.repository.find();
  }
}
