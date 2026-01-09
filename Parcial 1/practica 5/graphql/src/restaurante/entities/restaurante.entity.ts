import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Restaurante {
  @Field(() => ID)
  id_lugar: string;

  @Field()
  nombre: string;

  @Field()
  ubicacion: string;

  @Field()
  descripcion: string;

  @Field()
  id_restaurante: string;

  @Field()
  tipo_comida: string;
}
