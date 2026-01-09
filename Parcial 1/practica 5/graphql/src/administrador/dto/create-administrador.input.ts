import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdministradorInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
