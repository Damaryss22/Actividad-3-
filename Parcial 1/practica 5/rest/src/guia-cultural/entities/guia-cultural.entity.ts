import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('guias_culturales')
export class GuiaCultural {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  titulo!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({ type: 'varchar', length: 100 })
  categoria!: string;
  // Ej: 'normas_culturales', 'frases_basicas', 'costumbres', 'etiqueta'

  @Column({ type: 'text', nullable: true })
  contenido?: string;
  // Puede ser texto completo de la guía, instrucciones o frases útiles
}
