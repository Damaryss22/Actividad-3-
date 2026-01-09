import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTuristaDto } from './dto/create-turista.dto';
import { UpdateTuristaDto } from './dto/update-turista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turista } from './entities/turista.entity';

@Injectable()
export class TuristaService {
  async create(createTuristaDto: CreateTuristaDto) {
    const turista = this.turistaRepo.create(createTuristaDto);
      return await this.turistaRepo.save(turista);
  }
  
  constructor(
    @InjectRepository(Turista)
    private readonly turistaRepo: Repository<Turista>,
  ) {}
  
  async findAll() {
    return await this.turistaRepo.find();
  }

  async findOne(id: string) {
    const turista = await this.turistaRepo.findOneBy({ id });
    if (!turista) {
      throw new NotFoundException('No se encontró turista.');
    }
    return turista;
  }

  async update(id: string, updateTuristaDto: UpdateTuristaDto) {
    const turista = await this.turistaRepo.findOneBy({ id });
    if (!turista) {
      throw new NotFoundException('No se encontró turista.');
    }

    await this.turistaRepo.update(id, updateTuristaDto);
    return await this.turistaRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const turista = await this.findOne(id);
    await this.turistaRepo.remove(turista);
  }
}
