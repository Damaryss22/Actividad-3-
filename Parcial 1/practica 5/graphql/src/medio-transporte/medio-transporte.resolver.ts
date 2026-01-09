import { Resolver, Query, Args } from '@nestjs/graphql';
import { MedioTransporteService } from './medio-transporte.service';
import { MedioTransporte } from './entities/medio-transporte.entity';

@Resolver(() => MedioTransporte)
export class MedioTransporteResolver {
  constructor(private readonly medioTransporteService: MedioTransporteService) {}

  @Query(() => [MedioTransporte], { name: 'mediosTransporte' })
  findAll() {
    return this.medioTransporteService.findAll();
  }

  @Query(() => MedioTransporte, { name: 'medioTransporte', nullable: true })
  findOne(@Args('id_transporte', { type: () => String }) id_transporte: string) {
    return this.medioTransporteService.findOne(id_transporte);
  }
}
