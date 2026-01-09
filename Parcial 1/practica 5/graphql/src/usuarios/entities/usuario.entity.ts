import { ObjectType, Field, ID} from '@nestjs/graphql';

@ObjectType()
export class Usuario {
  @Field(() => ID)
  id: number;

  @Field()
  nombre: string;

  @Field()
  correo: string;

  @Field()
  contrasena: string;

  @Field()
  tipo: string;
}
