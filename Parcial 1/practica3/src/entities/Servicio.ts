import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Resena } from "./Resena";
import { MedioTransporte } from "./MedioTransporte";

@Entity("servicios")
export class Servicio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200 })
  descripcion!: string;

  @Column({ type: "varchar", length: 100 })
  tipo_servicio!: string;

  @Column({ type: "varchar", length: 100 })
  horario!: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  precio!: number;

  // 🔗 Relaciones

  // Una reseña está asociada a un servicio
  @OneToMany(() => Resena, (resena) => resena.servicio)
  resenas!: Resena[];

  // Un servicio puede estar relacionado con un medio de transporte
  @ManyToOne(() => MedioTransporte, { nullable: true })
  @JoinColumn({ name: "id_transporte" })
  medioTransporte?: MedioTransporte;
}
