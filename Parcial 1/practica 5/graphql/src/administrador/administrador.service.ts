import { Injectable } from '@nestjs/common';

@Injectable()
export class AdministradorService {
  private administradores = [
  {
    id: 1,
    nombre: 'Carlos López',
    correo: 'carlos@example.com',
    contrasena: '****',
    tipo: 'administrador',
  },
  {
    id: 2,
    nombre: 'María Torres',
    correo: 'maria@example.com',
    contrasena: '****',
    tipo: 'administrador',
  },
];
  
  findAll() {
    return this.administradores;
  }

  findOne(id: number) {
    return this.administradores.find((admin) => admin.id === id);
  }

}
