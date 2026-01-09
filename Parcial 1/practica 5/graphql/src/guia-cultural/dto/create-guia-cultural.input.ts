import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGuiaCulturalInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
