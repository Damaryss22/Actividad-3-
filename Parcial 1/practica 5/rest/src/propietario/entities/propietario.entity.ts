import { Entity, Column } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('propietarios')
export class Propietario extends Usuario {
  @Column({ type: 'varchar', length: 100 })
  tipo_negocio: string;
}
