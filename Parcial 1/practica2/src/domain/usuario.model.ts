export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  contraseña: string;
  tipo: string;
  idiomaPreferido: string;

  iniciarSesion(): void;
  cerrarSesion(): void;
  cambiarIdioma(): void;
}

export interface Administrador extends Usuario {
  gestionarUsuarios(): void;
  eliminarContenido(): void;
}
