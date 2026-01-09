import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Resena } from '../../resena/entities/resena.entity';
import { MedioTransporte } from '../../medio-transporte/entities/medio-transporte.entity';

@Entity('servicios')
export class CreateServicioDto {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  descripcion!: string;

  @Column({ type: 'varchar', length: 100 })
  tipo_servicio!: string;

  @Column({ type: 'varchar', length: 100 })
  horario!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  precio!: string;

  @OneToMany(() => Resena, (resena) => resena.servicio)
  resenas!: Resena[];

  // Un servicio puede estar relacionado con un medio de transporte
  @ManyToOne(() => MedioTransporte, { nullable: true })
  @JoinColumn({ name: 'id_transporte' })
  medioTransporte?: MedioTransporte;
}
