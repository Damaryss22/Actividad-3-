import { Resolver, Query, Args } from '@nestjs/graphql';
import { RestauranteService } from './restaurante.service';
import { Restaurante } from './entities/restaurante.entity';

@Resolver(() => Restaurante)
export class RestauranteResolver {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Query(() => [Restaurante], { name: 'restaurantes' })
  findAll() {
    return this.restauranteService.findAll();
  }

  @Query(() => Restaurante, { name: 'restaurante' })
  findOne(@Args('id_restaurante', { type: () => String }) id_restaurante: string) {
    return this.restauranteService.findOne(id_restaurante);
  }
}
