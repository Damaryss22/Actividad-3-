import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GuiaCultural {
  @Field(() => Int)
  id: number;

  @Field()
  titulo: string;

  @Field()
  descripcion: string;
}
