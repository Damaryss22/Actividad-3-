import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MedioTransporte {
  @Field(() => ID)
  id_transporte: string;

  @Field()
  nombreEmpresa: string;

  @Field()
  tipo_transporte: string;

  @Field()
  nombreCooperativa: string;

  @Field()
  ruta: string;
}
