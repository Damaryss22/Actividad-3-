import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { TuristaService } from './turista.service';
import { Turista } from './entities/turista.entity';

@Resolver(() => Turista)
export class TuristaResolver {
  constructor(private readonly turistaService: TuristaService) {}

  @Query(() => [Turista], { name: 'turistas' })  // plural para la lista
  findAll() {
    return this.turistaService.findAll();
  }

  @Query(() => Turista, { name: 'turista' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.turistaService.findOne(id);
  }
}
 