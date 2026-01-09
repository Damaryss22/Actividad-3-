import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Atraccion {
  @Field(() => ID)
  id_atraccion: string;

  @Field()
  nombre: string;

  @Field()
  ubicacion: string;

  @Field()
  descripcion: string;
}
