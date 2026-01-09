import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreatePropietarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contraseña: string;

  @IsString()
  @IsNotEmpty()
  tipo: string; // por ejemplo: 'propietario'

  @IsString()
  @IsNotEmpty()
  tipo_negocio: string;
}
