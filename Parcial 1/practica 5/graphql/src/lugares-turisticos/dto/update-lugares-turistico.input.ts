import { CreateLugaresTuristicoInput } from './create-lugares-turistico.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLugaresTuristicoInput extends PartialType(CreateLugaresTuristicoInput) {
  @Field(() => Int)
  id: number;
}
