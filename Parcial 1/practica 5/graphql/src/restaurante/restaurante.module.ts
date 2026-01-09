import { Module } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { RestauranteResolver } from './restaurante.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RestauranteResolver, RestauranteService],
  exports: [RestauranteService]
})
export class RestauranteModule {}
