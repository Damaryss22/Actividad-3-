import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propietario } from './entities/propietario.entity';
import { CreatePropietarioDto } from './dto/create-propietario.dto';
import { UpdatePropietarioDto } from './dto/update-propietario.dto';

@Injectable()
export class PropietariosService {
  constructor(
    @InjectRepository(Propietario)
    private readonly propietarioRepo: Repository<Propietario>,
  ) {}

  async create(createPropietarioDto: CreatePropietarioDto) {
    const propietario = this.propietarioRepo.create(createPropietarioDto);
    return await this.propietarioRepo.save(propietario);
  }

  async findAll() {
    return await this.propietarioRepo.find();
  }

  async findOne(id: string) {
    const propietario = await this.propietarioRepo.findOneBy({ id });
    if (!propietario) {
      throw new NotFoundException('No se encontró propietario.');
    }
    return propietario;
  }

  async update(id: string, updatePropietarioDto: UpdatePropietarioDto) {
    const propietario = await this.propietarioRepo.findOneBy({ id });
    if (!propietario) {
      throw new NotFoundException('No se encontró propietario.');
    }

    await this.propietarioRepo.update(id, updatePropietarioDto);
    return await this.propietarioRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const propietario = await this.findOne(id);
    await this.propietarioRepo.remove(propietario);
  }
}
