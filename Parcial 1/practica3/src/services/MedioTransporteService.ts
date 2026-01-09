import { AppDataSource } from "../data-source.js";
import { MedioTransporte } from "../entities/MedioTransporte.js";
import type { FindOptionsWhere } from "typeorm";

export class MedioTransporteService {
  private readonly repo =
    AppDataSource.getRepository(MedioTransporte);

  async create(data: Partial<MedioTransporte>) {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const where: FindOptionsWhere<MedioTransporte> =
      { id_transporte: id };
    return this.repo.findOneBy(where);
  }

  async update(
    id: number,
    data: Partial<MedioTransporte>
  ) {
    const where: FindOptionsWhere<MedioTransporte> =
      { id_transporte: id };
    await this.repo.update(where, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const where: FindOptionsWhere<MedioTransporte> =
      { id_transporte: id };
    return this.repo.delete(where);
  }
}
