import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAtraccionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
