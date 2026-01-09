import { Resolver, Query, Args } from '@nestjs/graphql';
import { AtraccionService } from './atraccion.service';
import { Atraccion } from './entities/atraccion.entity';

@Resolver(() => Atraccion)
export class AtraccionResolver {
  constructor(private readonly atraccionService: AtraccionService) {}

  @Query(() => [Atraccion], { name: 'atracciones' })
  findAll(){
    return this.atraccionService.findAll();
  }

  @Query(() => Atraccion, { name: 'atraccion' })
  findOne(@Args('id', { type: () => String }) id: string){
    return this.atraccionService.findOne(id);
  }
}
