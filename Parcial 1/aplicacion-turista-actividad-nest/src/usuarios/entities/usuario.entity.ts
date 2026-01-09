import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nombre!: string;

  @Column()
  correo!: string;

  @Column()
  contraseña!: string;

  @Column()
  tipo!: string;

  @Column()
  idiomaPreferido!: string;

  @Column()
  resenas!: string;

  iniciarSesion(): void {
    console.log(`${this.nombre} ha iniciado sesión.`);
  }

  cerrarSesion(): void {
    console.log(`${this.nombre} ha cerrado sesión.`);
  }

  cambiarIdioma(nuevoIdioma: string): void {
    this.idiomaPreferido = nuevoIdioma;
    console.log(`${this.nombre} cambió el idioma a ${this.idiomaPreferido}.`);
  }
}

@Entity()
export class Administrador extends Usuario {
  gestionarUsuarios(): void {
    console.log(`${this.nombre} está gestionando usuarios.`);
  }

  eliminarContenido(): void {
    console.log(`${this.nombre} eliminó contenido.`);
  }
}
