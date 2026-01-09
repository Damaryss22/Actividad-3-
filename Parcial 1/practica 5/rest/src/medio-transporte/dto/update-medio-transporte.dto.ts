import { PartialType } from '@nestjs/mapped-types';
import { CreateMedioTransporteDto } from './create-medio-transporte.dto';

export class UpdateMedioTransporteDto extends PartialType(CreateMedioTransporteDto) {}
