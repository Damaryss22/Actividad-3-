import { CreateMedioTransporteInput } from './create-medio-transporte.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMedioTransporteInput extends PartialType(CreateMedioTransporteInput) {
  @Field(() => Int)
  id: number;
}
