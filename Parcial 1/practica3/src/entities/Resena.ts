import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Servicio } from "./Servicio.js";

@Entity("resenas")
export class Resena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  autor: string;

  @Column({ type: "varchar", length: 300 })
  destino: string; // Nombre del lugar o servicio reseñado

  @Column({ type: "text" })
  mensaje: string;

  @Column({ type: "int", default: 5 })
  calificacion: number; // 1-5 estrellas

  @CreateDateColumn()
  fecha: Date;

  // Relaciones
  @ManyToOne(
    () => Servicio,
    (servicio) => servicio.resenas
  )
  servicio: Servicio;
}
