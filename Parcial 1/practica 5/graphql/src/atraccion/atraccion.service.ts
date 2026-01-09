import { Injectable } from '@nestjs/common';

@Injectable()
export class AtraccionService {
  private atracciones = [
  {
    id_atraccion: '1',
      nombre: 'Chichen Itza',
      ubicacion: 'Yucatán, México',
      descripcion: 'Zona arqueológica maya.'
    },
    {

    id_atraccion: '2',
      nombre: 'Playa del Carmen',
      ubicacion: 'Quintana Roo, México',
      descripcion: 'Famosa por sus playas y vida nocturna.'
    },
  ];

  findAll(){
    return this.atracciones;
  }

  findOne(id: string){
    return this. atracciones.find((atraccion) => atraccion.id_atraccion === id);
  }
}
