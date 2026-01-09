import { Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorResolver } from './administrador.resolver';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports: [HttpModule],
  providers: [AdministradorResolver, AdministradorService],
  exports: [AdministradorService]
})
export class AdministradorModule {}
