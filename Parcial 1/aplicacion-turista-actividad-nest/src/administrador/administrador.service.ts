import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrador } from './entities/administrador.entity';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador)
    private readonly administradorRepo: Repository<Administrador>,
  ) {}

  async create(createAdminDto: CreateAdministradorDto): Promise<Administrador> {
    const admin = this.administradorRepo.create(createAdminDto);
    return this.administradorRepo.save(admin);
  }

  async findAll(): Promise<Administrador[]> {
    return this.administradorRepo.find();
  }

  async findOne(id: string): Promise<Administrador> {
    const admin = await this.administradorRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Administrador no encontrado');
    return admin;
  }

  async update(
    id: string,
    updateAdminDto: UpdateAdministradorDto,
  ): Promise<Administrador> {
    const admin = await this.findOne(id);
    Object.assign(admin, updateAdminDto);
    return this.administradorRepo.save(admin);
  }

  async remove(id: string): Promise<void> {
    const admin = await this.findOne(id);
    await this.administradorRepo.remove(admin);
  }
}
