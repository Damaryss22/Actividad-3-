import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'administradores' })
export class Administrador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contraseña: string;

  // Métodos de la interfaz
  gestionarUsuario(): void {
    console.log('Gestionando usuarios...');
  }

  eliminarContenido(): void {
    console.log('Eliminando contenido...');
  }
}
