import { Injectable } from '@nestjs/common';

@Injectable()
export class TuristaService {
  private turistas = [
    {
      id: '1',
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      contrasena: '123456',
      tipo: 'turista',
      preferencias: ['playa', 'montaña'],
      idiomaPreferido: 'español',
    },
    {
      id: '2',
      nombre: 'Ana Gómez',
      correo: 'ana@example.com',
      contrasena: 'abcdef',
      tipo: 'turista',
      preferencias: ['museos', 'gastronomía'],
      idiomaPreferido: 'inglés',
    },
  ];

  findAll() {
    return this.turistas;
  }

  findOne(id: string) {
    return this.turistas.find((turista) => turista.id === id);
  }
}
