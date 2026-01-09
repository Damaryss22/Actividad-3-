import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepo: Repository<Servicio>,
  ) {}

  async create(createServicioDto: CreateServicioDto) {
    const servicio = this.servicioRepo.create(createServicioDto);
    return await this.servicioRepo.save(servicio);
  }

  async findAll() {
    return await this.servicioRepo.find();
  }

  async findOne(id: string) {
    const servicio = await this.servicioRepo.findOneBy({ id });
    if (!servicio) {
      throw new NotFoundException('No se encontró el servicio.');
    }
    return servicio;
  }

  async update(id: string, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.servicioRepo.findOneBy({ id });
    if (!servicio) {
      throw new NotFoundException('No se encontró el servicio.');
    }

    await this.servicioRepo.update(id, updateServicioDto);
    return await this.servicioRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const servicio = await this.findOne(id);
    await this.servicioRepo.remove(servicio);
  }
}
