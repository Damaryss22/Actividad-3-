import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('resenas')
export class Resena {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  autor!: string;

  @Column({ type: 'varchar', length: 300 })
  destino!: string; // Lugar o servicio reseñado

  @Column({ type: 'text' })
  mensaje!: string;

  @Column({ type: 'int', default: 5 })
  calificacion!: string; // 1 a 5 estrellas

  @CreateDateColumn()
  fecha!: Date;

  // 🔗 Relación con Servicio
  @ManyToOne(() => Usuario, (usuario) => usuario.resenas) //cambiar por usuario
  usuario!: Usuario;
}
