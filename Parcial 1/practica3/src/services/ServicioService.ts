import { AppDataSource } from "../data-source.js";
import { Servicio } from "../entities/Servicio.js";

export class ServicioService {
  private readonly repository =
    AppDataSource.getRepository(Servicio);

  async create(data: Partial<Servicio>) {
    const ent = this.repository.create(data);
    return this.repository.save(ent);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({
      id,
    } as any);
  }

  async update(
    id: number,
    data: Partial<Servicio>
  ) {
    await this.repository.update(
      { id } as any,
      data
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repository.delete({ id } as any);
  }
}
