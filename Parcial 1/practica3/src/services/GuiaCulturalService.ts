import { AppDataSource } from "../data-source.js";
import { GuiaCultural } from "../entities/GuiaCultural.js";
import type { FindOptionsWhere } from "typeorm";

export class GuiaCulturalService {
  private readonly repo =
    AppDataSource.getRepository(GuiaCultural);

  async create(data: Partial<GuiaCultural>) {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const where: FindOptionsWhere<GuiaCultural> =
      { id };
    return this.repo.findOneBy(where);
  }

  async update(
    id: number,
    data: Partial<GuiaCultural>
  ) {
    const where: FindOptionsWhere<GuiaCultural> =
      { id };
    await this.repo.update(where, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const where: FindOptionsWhere<GuiaCultural> =
      { id };
    return this.repo.delete(where);
  }
}
