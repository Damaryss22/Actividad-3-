import { IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre!: string;

  @IsString()
  correo!: string;

  @IsString()
  contraseña!: string;

  @IsString()
  tipo!: string;

  @IsString()
  resenas!: string;

  @IsString()
  idiomaPreferido!: string;
}
