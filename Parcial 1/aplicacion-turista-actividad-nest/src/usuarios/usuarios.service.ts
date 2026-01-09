import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuariosService {
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuarioRepo.create(createUsuarioDto);
      return await this.usuarioRepo.save(usuario);
  }

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async findAll() {
    return `This action returns all usuarios`;
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepo.findOneBy ({id})
    if (!usuario)
      throw new NotFoundException("No se encontró usuario.")
    return usuario
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepo.findOneBy({ id })
    if (!usuario) 
      throw new NotFoundException ("No se encontró usuario.");
    await this.usuarioRepo.update(id, updateUsuarioDto);
    return await this.usuarioRepo.findOneBy({id});
  }

  async remove(id: string) {
    const usuario = await this.findOne(id)
  await this.usuarioRepo.remove(usuario)
  }
}
