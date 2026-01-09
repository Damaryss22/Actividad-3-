import { CreateResenaInput } from './create-resena.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResenaInput extends PartialType(CreateResenaInput) {
  @Field(() => Int)
  id: number;
}
