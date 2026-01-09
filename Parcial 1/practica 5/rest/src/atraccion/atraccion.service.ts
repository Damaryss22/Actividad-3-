import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atraccion } from './entities/atraccion.entity';
import { CreateAtraccionDto } from './dto/create-atraccion.dto';
import { UpdateAtraccionDto } from './dto/update-atraccion.dto';

@Injectable()
export class AtraccionService {
  constructor(
    @InjectRepository(Atraccion)
    private readonly atraccionRepo: Repository<Atraccion>,
  ) {}

  async create(createAtraccionDto: CreateAtraccionDto) {
    const atraccion = this.atraccionRepo.create(createAtraccionDto);
    return await this.atraccionRepo.save(atraccion);
  }

  async findAll() {
    return await this.atraccionRepo.find();
  }

  async findOne(id: string) {
    const atraccion = await this.atraccionRepo.findOneBy({ id });
    if (!atraccion) {
      throw new NotFoundException('No se encontró la atracción turística.');
    }
    return atraccion;
  }

  async update(id: string, updateAtraccionDto: UpdateAtraccionDto) {
    const atraccion = await this.atraccionRepo.findOneBy({ id });
    if (!atraccion) {
      throw new NotFoundException('No se encontró la atracción turística.');
    }
    await this.atraccionRepo.update(id, updateAtraccionDto);
    return await this.atraccionRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const atraccion = await this.findOne(id);
    await this.atraccionRepo.remove(atraccion);
  }
}
