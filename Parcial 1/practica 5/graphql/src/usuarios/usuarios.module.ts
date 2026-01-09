import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UsuariosResolver, UsuariosService],
  exports: [UsuariosService], 
})
export class UsuariosModule {}
