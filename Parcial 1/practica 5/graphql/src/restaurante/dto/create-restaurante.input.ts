import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestauranteInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
