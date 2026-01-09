import { Module } from '@nestjs/common';
import { MedioTransporteService } from './medio-transporte.service';
import { MedioTransporteController } from './medio-transporte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedioTransporte } from './entities/medio-transporte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedioTransporte])],
  controllers: [MedioTransporteController],
  providers: [MedioTransporteService],
  exports: [TypeOrmModule],
})
export class MedioTransporteModule {}
