import { Module } from '@nestjs/common';
import { AdministradorService } from '../administrador/administrador.service';
import { AdministradorController } from './administrador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  controllers: [AdministradorController],
  providers: [AdministradorService],
  exports: [TypeOrmModule],
})
export class AdministradorModule {}
