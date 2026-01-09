import { Injectable } from '@nestjs/common';

@Injectable()
export class ResenaService {
  private resenas = [
  {
    id: '1',
    autor: 'Juan Perez',
    destino: 'Cancún',
    mensaje: 'Excelente experiencia, volveré pronto!',
    fecha: '2024-10-01',
    foto: 'foto1.jpg',
  },
  {
    id: '2',
    autor: 'María Gómez',
    destino: 'Playa del Carmen',
    mensaje: 'Muy buen servicio y atención',
    fecha: '2024-09-15',
    foto: 'foto2.jpg',
  },
];

  findAll(){
    return this.resenas;
  }

  findOne(id: string){
    return this.resenas.find(resena => resena.id === id);
  }

}
