import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedioTransporteDto } from './dto/create-medio-transporte.dto';
import { UpdateMedioTransporteDto } from './dto/update-medio-transporte.dto';
import { MedioTransporte } from './entities/medio-transporte.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MedioTransporteService {
  constructor(
    @InjectRepository(MedioTransporte)
    private readonly medioTransporteRepo: Repository<MedioTransporte>,
  ) {}

  async create(createMedioTransporteDto: CreateMedioTransporteDto) {
    const medio = this.medioTransporteRepo.create(createMedioTransporteDto);
    return await this.medioTransporteRepo.save(medio);
  }

  async findAll() {
    return await this.medioTransporteRepo.find();
  }

  async findOne(id: string) {
    const medio = await this.medioTransporteRepo.findOneBy({
      id_transporte: id,
    });
    if (!medio)
      throw new NotFoundException('No se encontró el medio de transporte.');
    return medio;
  }

  async update(id: string, updateMedioTransporteDto: UpdateMedioTransporteDto) {
    const medio = await this.medioTransporteRepo.findOneBy({
      id_transporte: id,
    });

    if (!medio)
      throw new NotFoundException('No se encontró el medio de transporte.');

    Object.assign(medio, updateMedioTransporteDto);

    return await this.medioTransporteRepo.save(medio);
  }

  async remove(id: string) {
    const medio = await this.findOne(id);
    await this.medioTransporteRepo.remove(medio);
  }
}
