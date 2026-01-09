import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateResenaDto {
  @IsString()
  @IsNotEmpty()
  autor!: string;

  @IsString()
  @IsNotEmpty()
  destino!: string;

  @IsString()
  @IsNotEmpty()
  mensaje!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  calificacion?: string;

  @IsInt()
  @IsOptional()
  servicioId?: string; // Para relacionar con un servicio
}
