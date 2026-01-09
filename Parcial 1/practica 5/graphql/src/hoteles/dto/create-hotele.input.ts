import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHoteleInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
