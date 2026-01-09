import { Injectable } from '@nestjs/common';

@Injectable()
export class GuiaCulturalService {
  private guias = [
    { id: 1, titulo: 'Museo de Historia', descripcion: 'Exposición sobre la historia local.' },
    { id: 2, titulo: 'Ruta del Arte', descripcion: 'Recorrido por galerías y murales urbanos.' },
  ];

  findAll() {
    return this.guias;
  }

  findOne(id: number) {
    return this.guias.find((guia) => guia.id === id);
  }
}
