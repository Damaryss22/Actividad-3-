import { AppDataSource } from "../data-source";
import { Restaurante } from "../entities/restaurantes.model"; 
import { Repository } from "typeorm";

export class RestauranteService {
  private repository: Repository<Restaurante>;

  constructor() {
    this.repository = AppDataSource.getRepository(Restaurante);
  }

  async crear(nuevo: Omit<Restaurante, "id" | "publicarMenu">): Promise<Restaurante> {
    if (!nuevo.nombre_lugar || !nuevo.ubicacion || !nuevo.descripcion || !nuevo.tipoComida) {
      throw new Error("Faltan campos obligatorios");
    }

    const restaurante = this.repository.create(nuevo);
    return await this.repository.save(restaurante);
  }

  async mostrar(id: number): Promise<Restaurante> {
    const restaurante = await this.repository.findOneBy({ id });
    if (!restaurante) throw new Error("Restaurante no encontrado");
    return restaurante;
  }

  async actualizar(
    id: number,
    datos: Partial<Omit<Restaurante, "id" | "publicarMenu">>
  ): Promise<Restaurante> {
    const restaurante = await this.mostrar(id);
    Object.assign(restaurante, datos);
    return await this.repository.save(restaurante);
  }

  async eliminar(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) throw new Error("Restaurante no encontrado");
  }

  async listar(): Promise<Restaurante[]> {
    return await this.repository.find();
  }

  async publicarMenu(id: number): Promise<void> {
    const restaurante = await this.mostrar(id);
    restaurante.publicarMenu(); // método de instancia en la entidad
  }
}
