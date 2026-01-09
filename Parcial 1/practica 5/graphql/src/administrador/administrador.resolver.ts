import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { AdministradorService } from './administrador.service';
import { Administrador } from './entities/administrador.entity';

@Resolver(() => Administrador)
export class AdministradorResolver {
  constructor(private readonly administradorService: AdministradorService) {}

  @Query(() => [Administrador], { name: 'administradores' })
  findAll() {
    return this.administradorService.findAll();
  }

  @Query(() => Administrador, { name: 'administrador' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.administradorService.findOne(id);
  }
}
