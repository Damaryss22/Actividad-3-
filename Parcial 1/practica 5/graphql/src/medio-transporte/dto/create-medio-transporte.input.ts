import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMedioTransporteInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
