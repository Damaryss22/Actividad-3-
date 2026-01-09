import { PartialType } from '@nestjs/mapped-types';
import { CreateGuiaCulturalDto } from './create-guia-cultural.dto';

export class UpdateGuiaCulturalDto extends PartialType(CreateGuiaCulturalDto) {}
