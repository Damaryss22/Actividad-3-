import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LugaresTuristico } from './entities/lugares-turistico.entity';
import { CreateLugaresTuristicoDto } from './dto/create-lugares-turistico.dto';
import { UpdateLugaresTuristicoDto } from './dto/update-lugares-turistico.dto';

@Injectable()
export class LugaresTuristicosService {
  constructor(
    @InjectRepository(LugaresTuristico)
    private readonly lugaresRepo: Repository<LugaresTuristico>,
  ) {}

  async create(createLugaresTuristicoDto: CreateLugaresTuristicoDto) {
    const lugar = this.lugaresRepo.create(createLugaresTuristicoDto);
    return await this.lugaresRepo.save(lugar);
  }

  async findAll() {
    return await this.lugaresRepo.find();
  }

  async findOne(id: string) {
    const lugar = await this.lugaresRepo.findOneBy({ id });
    if (!lugar) {
      throw new NotFoundException('No se encontró el lugar turístico.');
    }
    return lugar;
  }

  async update(
    id: string,
    updateLugaresTuristicoDto: UpdateLugaresTuristicoDto,
  ) {
    const lugar = await this.lugaresRepo.findOneBy({ id });
    if (!lugar) {
      throw new NotFoundException('No se encontró el lugar turístico.');
    }
    await this.lugaresRepo.update(id, updateLugaresTuristicoDto);
    return await this.lugaresRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const lugar = await this.findOne(id);
    await this.lugaresRepo.remove(lugar);
  }
}
