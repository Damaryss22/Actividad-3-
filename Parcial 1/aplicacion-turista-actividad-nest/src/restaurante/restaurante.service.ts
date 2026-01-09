import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private readonly restauranteRepo: Repository<Restaurante>,
  ) {}

  async create(createRestauranteDto: CreateRestauranteDto) {
    const restaurante = this.restauranteRepo.create(createRestauranteDto);
    return await this.restauranteRepo.save(restaurante);
  }

  async findAll() {
    return await this.restauranteRepo.find();
  }

  async findOne(id: string) {
    const restaurante = await this.restauranteRepo.findOneBy({ id });
    if (!restaurante) {
      throw new NotFoundException('No se encontró el restaurante.');
    }
    return restaurante;
  }

  async update(id: string, updateRestauranteDto: UpdateRestauranteDto) {
    const restaurante = await this.restauranteRepo.findOneBy({ id });
    if (!restaurante) {
      throw new NotFoundException('No se encontró el restaurante.');
    }
    await this.restauranteRepo.update(id, updateRestauranteDto);
    return await this.restauranteRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const restaurante = await this.findOne(id);
    await this.restauranteRepo.remove(restaurante);
  }
}
