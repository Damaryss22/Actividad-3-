import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  private usuarios = [
    { id: '1', nombre: 'Juan Pérez', correo: 'juan@example.com', contrasena: '123456', tipo: 'admin' },
    { id: '2', nombre: 'Ana Gómez', correo: 'ana@example.com', contrasena: 'abcdef', tipo: 'usuario' },
  ];

  findAll() {
    return this.usuarios;
  }

  findOne(id: string) {
    return this.usuarios.find(u => u.id === id);
  }
}

