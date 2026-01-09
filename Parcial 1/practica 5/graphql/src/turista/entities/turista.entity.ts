// turista.entity.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@ObjectType()
export class Turista extends Usuario {
  @Field(() => [String])
  preferencias: string[];

  @Field()
  idiomaPreferido: string;
}
