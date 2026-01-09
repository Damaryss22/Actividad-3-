import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Hotele {
  @Field(() => Int)
  id_lugar: number;

  @Field()
  nombre: string;

  @Field()
  ubicacion: string;

  @Field()
  descripcion: string;

  @Field()
  id_hotel: string;

  @Field()
  clasificacion: string;
}
