import { CreateAdministradorInput } from './create-administrador.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdministradorInput extends PartialType(CreateAdministradorInput) {
  @Field(() => Int)
  id: number;
}
