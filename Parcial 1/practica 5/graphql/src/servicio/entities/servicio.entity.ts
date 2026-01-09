import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Servicio {
  @Field(() => String)
  id: string;

  @Field()
  descripcion: string;

  @Field()
  tipo_servicio: string;

  @Field()
  horario: string;

  @Field(() => Float)
  precio: number;
}
