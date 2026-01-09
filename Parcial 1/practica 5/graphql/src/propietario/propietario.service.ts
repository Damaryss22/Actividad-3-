import { Injectable } from '@nestjs/common';

@Injectable()
export class PropietarioService {
  private propietarios = [
    {
    id: '1',
    nombre: 'Ana Gómez',
    correo: 'ana@example.com',
    contrasena: '****',
    tipo: 'propietario',
    tipo_negocio: 'Hotel'
    },
    {
      id: '2',
      nombre: 'Carlos López',
      correo: 'carlos@example.com',
      contrasena: '****',
      tipo: 'propietario',
      tipo_negocio: 'Restaurante'
    },

  ]

  findAll() {
    return this.propietarios;
  }

  findOne(id: string) {
    return this.propietarios.find((propietario) => propietario.id === id);
  }
}
