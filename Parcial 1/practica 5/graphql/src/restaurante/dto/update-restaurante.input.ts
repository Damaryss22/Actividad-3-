import { CreateRestauranteInput } from './create-restaurante.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRestauranteInput extends PartialType(CreateRestauranteInput) {
  @Field(() => Int)
  id: number;
}
