import { ObjectType, Field } from '@nestjs/graphql';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@ObjectType()
export class Propietario extends Usuario {
    @Field()
    tipo_negocio: string;
}
