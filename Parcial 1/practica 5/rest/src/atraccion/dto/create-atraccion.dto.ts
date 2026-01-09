import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateAtraccionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  horario?: string;

  @IsNumber()
  @IsOptional()
  precioEntrada?: number;
}
