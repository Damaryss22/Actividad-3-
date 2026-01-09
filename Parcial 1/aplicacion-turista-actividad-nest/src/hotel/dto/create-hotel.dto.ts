import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateHotelDto {
  // Campos heredados de LugaresTuristicos
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

  // Campos propios de Hotel
  @IsString()
  @IsNotEmpty()
  clasificacion: string;

  @IsString()
  @IsNotEmpty()
  servicios_hotel: string;
}
