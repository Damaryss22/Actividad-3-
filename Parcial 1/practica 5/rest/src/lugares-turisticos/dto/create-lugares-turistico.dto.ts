import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLugaresTuristicoDto {
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
