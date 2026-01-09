import { PartialType } from '@nestjs/mapped-types';
import { CreateTuristaDto } from './create-turista.dto';

export class UpdateTuristaDto extends PartialType(CreateTuristaDto) {}
