import { CreateAtraccionInput } from './create-atraccion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAtraccionInput extends PartialType(CreateAtraccionInput) {
  @Field(() => Int)
  id: number;
}
