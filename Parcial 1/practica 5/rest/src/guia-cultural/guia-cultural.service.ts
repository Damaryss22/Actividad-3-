import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuiaCultural } from './entities/guia-cultural.entity';
import { CreateGuiaCulturalDto } from './dto/create-guia-cultural.dto';
import { UpdateGuiaCulturalDto } from './dto/update-guia-cultural.dto';

@Injectable()
export class GuiaCulturalService {
  constructor(
    @InjectRepository(GuiaCultural)
    private readonly guiaRepo: Repository<GuiaCultural>,
  ) {}

  async create(createGuiaCulturalDto: CreateGuiaCulturalDto) {
    const guia = this.guiaRepo.create(createGuiaCulturalDto);
    return await this.guiaRepo.save(guia);
  }

  async findAll() {
    return await this.guiaRepo.find();
  }

  async findOne(id: string) {
    const guia = await this.guiaRepo.findOneBy({ id });
    if (!guia) {
      throw new NotFoundException('No se encontró la guía cultural.');
    }
    return guia;
  }

  async update(id: string, updateGuiaCulturalDto: UpdateGuiaCulturalDto) {
    const guia = await this.guiaRepo.findOneBy({ id });
    if (!guia) {
      throw new NotFoundException('No se encontró la guía cultural.');
    }
    await this.guiaRepo.update(id, updateGuiaCulturalDto);
    return await this.guiaRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const guia = await this.findOne(id);
    await this.guiaRepo.remove(guia);
  }
}
