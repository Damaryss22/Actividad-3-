import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class LugaresTuristico {
  @Field(() => ID)
  id_lugar: string;

  @Field()
  nombre: string;

  @Field()
  ubicacion: string;

  @Field()
  descripcion: string;
}
