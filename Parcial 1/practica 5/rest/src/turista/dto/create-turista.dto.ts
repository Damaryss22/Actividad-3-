import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateUsuarioDto } from '../../usuarios/dto/create-usuario.dto';

export class CreateTuristaDto extends CreateUsuarioDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferencias?: string[];
}
