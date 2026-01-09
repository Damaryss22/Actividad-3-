import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column
} from "typeorm";

@Entity("guias_culturales")
export class GuiaCultural {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  titulo: string;

  @Column({ type: "text" })
  descripcion: string;

  @Column({ type: "varchar", length: 100 })
  categoria: string; // 'normas_culturales', 'frases_basicas', 'costumbres', 'etiqueta'

  @Column({ type: "text", nullable: true })
  contenido: string; // Texto completo de la guía o frase
}
