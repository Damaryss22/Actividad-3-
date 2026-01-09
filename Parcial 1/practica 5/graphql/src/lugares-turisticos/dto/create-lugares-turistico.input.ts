import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLugaresTuristicoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
