import { AppDataSource } from "../data-source.js";
import { Resena } from "../entities/Resena.js";

export class ResenaService {
  private repo =
    AppDataSource.getRepository(Resena);

  async create(data: Partial<Resena>) {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id } as any);
  }

  async update(
    id: number,
    data: Partial<Resena>
  ) {
    await this.repo.update({ id } as any, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete({ id } as any);
  }
}
