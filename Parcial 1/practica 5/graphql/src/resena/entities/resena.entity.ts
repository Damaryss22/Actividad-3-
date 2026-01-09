import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Resena {
  @Field(() => ID)
  id: string;

  @Field()
  autor: string;

  @Field()
  destino: string;

  @Field()
  mensaje: string;

  @Field()
  fecha: string;

  @Field({ nullable: true })
  foto?: string;
}
