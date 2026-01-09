
import { AppDataSource } from "../data-source";
import { Hotel } from "../entities/hoteles.model";
import { Repository } from "typeorm";

export class HotelService {
  private repository: Repository<Hotel>;

  constructor() {
    this.repository = AppDataSource.getRepository(Hotel);
  }

  async crear(nuevo: Omit<Hotel, "id">): Promise<Hotel> {
    if (
      !nuevo.nombre_lugar ||
      !nuevo.ubicacion ||
      !nuevo.descripcion ||
      !nuevo.clasificacion ||
      !nuevo.servicios_hotel
    ) {
      throw new Error("Faltan campos obligatorios para crear el hotel");
    }

    const hotel = this.repository.create(nuevo);
    return await this.repository.save(hotel);
  }

  async mostrar(id: number): Promise<Hotel> {
    const hotel = await this.repository.findOneBy({ id });
    if (!hotel) {
      throw new Error("Hotel no encontrado");
    }
    return hotel;
  }

  async actualizar(
    id: number,
    datos: Partial<Omit<Hotel, "id">>
  ): Promise<Hotel> {
    const hotel = await this.mostrar(id); // busca o lanza error
    Object.assign(hotel, datos);
    return await this.repository.save(hotel);
  }

  async eliminar(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error("Hotel no encontrado");
    }
  }

  async listar(): Promise<Hotel[]> {
    return await this.repository.find();
  }
}
