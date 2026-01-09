import { CreateHoteleInput } from './create-hotele.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHoteleInput extends PartialType(CreateHoteleInput) {
  @Field(() => Int)
  id: number;
}
