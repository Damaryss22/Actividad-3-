import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateResenaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
