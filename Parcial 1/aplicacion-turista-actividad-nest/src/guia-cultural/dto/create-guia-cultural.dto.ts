import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGuiaCulturalDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsOptional()
  contenido?: string;
}
