import { PartialType } from '@nestjs/mapped-types';
import { CreateAtraccionDto } from './create-atraccion.dto';

export class UpdateAtraccionDto extends PartialType(CreateAtraccionDto) {}
