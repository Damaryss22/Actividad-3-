import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuario.entity';
import { PropietarioModule } from './propietario/propietario.module';
import { TuristaModule } from './turista/turista.module';
import { AdministradorModule } from './administrador/administrador.module';
import { GuiaCulturalModule } from './guia-cultural/guia-cultural.module';
import { ResenaModule } from './resena/resena.module';
import { ServicioModule } from './servicio/servicio.module';
import { MedioTransporteModule } from './medio-transporte/medio-transporte.module';
import { LugaresTuristicosModule } from './lugares-turisticos/lugares-turisticos.module';
import { HotelModule } from './hotel/hotel.module';
import { RestauranteModule } from './restaurante/restaurante.module';
import { AtraccionModule } from './atraccion/atraccion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/my-database.sqlite',
      entities: [Usuario],
      synchronize: true,
    }),
    PropietarioModule,
    TuristaModule,
    AdministradorModule,
    GuiaCulturalModule,
    ResenaModule,
    ServicioModule,
    MedioTransporteModule,
    LugaresTuristicosModule,
    HotelModule,
    RestauranteModule,
    AtraccionModule,
  ],
})
export class AppModule {}
