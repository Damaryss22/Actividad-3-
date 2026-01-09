import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Query(() => [Usuario], { name: 'usuarios' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Query(() => Usuario, { name: 'usuario' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usuariosService.findOne(id.toString());
  }
}
