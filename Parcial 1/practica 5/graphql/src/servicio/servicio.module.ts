import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioResolver } from './servicio.resolver';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports: [HttpModule],
  providers: [ServicioResolver, ServicioService],
  exports: [ServicioService]
})
export class ServicioModule {}
