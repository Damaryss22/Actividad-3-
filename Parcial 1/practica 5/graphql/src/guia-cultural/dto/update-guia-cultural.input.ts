import { CreateGuiaCulturalInput } from './create-guia-cultural.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuiaCulturalInput extends PartialType(CreateGuiaCulturalInput) {
  @Field(() => Int)
  id: number;
}
