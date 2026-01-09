import { Resolver, Query, Args } from '@nestjs/graphql';
import { PropietarioService } from './propietario.service';
import { Propietario } from './entities/propietario.entity';

@Resolver(() => Propietario)
export class PropietarioResolver {
  constructor(private readonly propietarioService: PropietarioService) {}

  @Query(() => [Propietario], { name: 'propietarios' }) 
  findAll() {
    return this.propietarioService.findAll();
  }

  @Query(() => Propietario, { name: 'propietario', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.propietarioService.findOne(id);
  }
}
