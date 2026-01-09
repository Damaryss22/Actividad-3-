import { CreateTuristaInput } from './create-turista.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTuristaInput extends PartialType(CreateTuristaInput) {
  @Field(() => Int)
  id: number;
}
