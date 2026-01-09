import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity("medios_transporte")
export class MedioTransporte {
  @PrimaryGeneratedColumn()
  id_transporte!: number;

  @Column({ type: "varchar", length: 150 })
  nombreEmpresa!: string;

  @Column({ type: "varchar", length: 100 })
  tipo_transporte!: string; // 'bus', 'taxi', 'metro', 'a_pie'

  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
  })
  nombreCooperativa!: string;

  @Column({ type: "text", nullable: true })
  ruta!: string; // Descripción de la ruta o trayecto

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  tarifa!: number;

  @Column({ type: "int", nullable: true })
  distancia_km!: number; // Distancia en kilómetros

  @Column({ type: "int", nullable: true })
  tiempo_estimado_min!: number; // Tiempo en minutos
}
