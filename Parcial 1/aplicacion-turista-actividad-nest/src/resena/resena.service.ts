import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';
import { Resena } from './entities/resena.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResenaService {
  constructor(
    @InjectRepository(Resena)
    private readonly resenaRepo: Repository<Resena>,
  ) {}

  async create(createResenaDto: CreateResenaDto) {
    const resena = this.resenaRepo.create(createResenaDto);
    return await this.resenaRepo.save(resena);
  }

  async findAll() {
    return await this.resenaRepo.find();
  }

  async findOne(id: string) {
    const resena = await this.resenaRepo.findOneBy({ id });
    if (!resena) throw new NotFoundException('No se encontró la reseña.');
    return resena;
  }

  async update(id: string, updateResenaDto: UpdateResenaDto) {
    const resena = await this.resenaRepo.preload({
      id,
      ...updateResenaDto,
    });
    if (!resena) throw new NotFoundException('No se encontró la reseña.');
    return await this.resenaRepo.save(resena);
  }

  async remove(id: string) {
    const resena = await this.findOne(id);
    await this.resenaRepo.remove(resena);
  }
}
