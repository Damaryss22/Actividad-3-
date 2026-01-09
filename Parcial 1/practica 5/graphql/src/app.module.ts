import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TuristaModule } from './turista/turista.module';
import { PropietarioModule } from './propietario/propietario.module';
import { AdministradorModule } from './administrador/administrador.module';
import { GuiaCulturalModule } from './guia-cultural/guia-cultural.module';
import { ResenaModule } from './resena/resena.module';
import { MedioTransporteModule } from './medio-transporte/medio-transporte.module';
import { LugaresTuristicosModule } from './lugares-turisticos/lugares-turisticos.module';
import { HotelesModule } from './hoteles/hoteles.module';
import { RestauranteModule } from './restaurante/restaurante.module';
import { AtraccionModule } from './atraccion/atraccion.module';
import { ServicioModule } from './servicio/servicio.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Apollo Playground
    }),
    UsuariosModule,
    TuristaModule,
    PropietarioModule,
    AdministradorModule,
    GuiaCulturalModule,
    ResenaModule,
    MedioTransporteModule,
    LugaresTuristicosModule,
    HotelesModule,
    RestauranteModule,
    AtraccionModule,
    ServicioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
