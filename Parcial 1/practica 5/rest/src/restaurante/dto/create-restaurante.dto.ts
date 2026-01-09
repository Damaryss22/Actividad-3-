import { IsString } from 'class-validator';

export class CreateRestauranteDto {
  @IsString()
  tipoComida: string;
}
