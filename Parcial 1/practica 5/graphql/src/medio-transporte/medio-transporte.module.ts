import { Module } from '@nestjs/common';
import { MedioTransporteService } from './medio-transporte.service';
import { MedioTransporteResolver } from './medio-transporte.resolver';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports: [HttpModule],
  providers: [MedioTransporteResolver, MedioTransporteService],
  exports: [MedioTransporteService]
})
export class MedioTransporteModule {}
