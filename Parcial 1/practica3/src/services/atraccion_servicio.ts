import { AppDataSource } from "../data-source";
import { Atraccion } from "../entities/atraccion.model";
import { Repository } from "typeorm";

export class AtraccionService {
  private repository: Repository<Atraccion>;

  constructor() {
    this.repository = AppDataSource.getRepository(Atraccion);
  }

  async crear(nueva: Omit<Atraccion, "id">): Promise<Atraccion> {
    if (!nueva.nombre_lugar || !nueva.ubicacion || !nueva.descripcion) {
      throw new Error("Faltan campos obligatorios para crear la atracción");
    }
    const atraccion = this.repository.create(nueva);
    return await this.repository.save(atraccion);
  }

  async mostrar(id: number): Promise<Atraccion> {
    const atraccion = await this.repository.findOneBy({ id });
    if (!atraccion) {
      throw new Error("Atracción no encontrada");
    }
    return atraccion;
  }

  async actualizar(
    id: number,
    datos: Partial<Omit<Atraccion, "id">>
  ): Promise<Atraccion> {
    const atraccion = await this.mostrar(id); // busca o lanza error
    Object.assign(atraccion, datos);
    return await this.repository.save(atraccion);
  }

  async eliminar(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error("Atracción no encontrada");
    }
  }

  async listar(): Promise<Atraccion[]> {
    return await this.repository.find();
  }
}
