import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMedioTransporteDto {
  @IsString()
  @IsNotEmpty()
  nombreEmpresa!: string;

  @IsString()
  @IsNotEmpty()
  tipo_transporte!: string; // Ej: 'bus', 'taxi', 'metro', 'a_pie'

  @IsString()
  @IsOptional()
  nombreCooperativa?: string;

  @IsString()
  @IsOptional()
  ruta?: string;

  @IsNumber()
  @IsOptional()
  tarifa?: number;

  @IsInt()
  @IsOptional()
  distancia_km?: number;

  @IsInt()
  @IsOptional()
  tiempo_estimado_min?: number;
}
