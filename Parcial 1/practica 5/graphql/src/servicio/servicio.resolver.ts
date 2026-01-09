import { Resolver, Query, Args } from '@nestjs/graphql';
import { ServicioService } from './servicio.service';
import { Servicio } from './entities/servicio.entity';

@Resolver(() => Servicio)
export class ServicioResolver {
  constructor(private readonly servicioService: ServicioService) {}

  @Query(() => [Servicio], { name: 'servicios' })
  findAll() {
    return this.servicioService.findAll();
  }

  @Query(() => Servicio, { name: 'servicio' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.servicioService.findOne(id);
  }
}
