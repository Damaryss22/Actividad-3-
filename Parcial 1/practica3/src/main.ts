// src/main.ts
import { AppDataSource } from './data-source';
import { CrudTurista } from './services/turista_servicio';

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const usuarioService = new CrudTurista();

    // Seed: crear usuarios
    await usuarioService.create({
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      contraseña: '1234',
      tipo: 'admin',
      idiomaPreferido: 'es',
      preferencias: ['museos', 'gastronomía'],
      iniciarSesion: () => {
        console.log('Juan Pérez ha iniciado sesión.');
      },
      cerrarSesion: () => {
        console.log('Juan Pérez ha cerrado sesión.');
      },
      cambiarIdioma: (nuevoIdioma: string) => {
        console.log(`Juan Pérez cambió el idioma a ${nuevoIdioma}.`);
      },
    });

    // Listar todos los usuarios
    const usuarios = await usuarioService.findAll();
    console.log('Usuarios:', usuarios);

    // Actualizar usuario
    if (usuarios.length > 0) {
      const usuarioActualizado = await usuarioService.update(usuarios[0].id, {
        idiomaPreferido: 'en',
      });
      console.log('Usuario actualizado:', usuarioActualizado);
    }

    // Eliminar usuario
    if (usuarios.length > 0) {
      const eliminado = await usuarioService.remove(usuarios[0].id);
      console.log('Usuario eliminado:', eliminado);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
