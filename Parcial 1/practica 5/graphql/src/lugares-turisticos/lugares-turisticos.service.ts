import { Injectable } from '@nestjs/common';

@Injectable()
export class LugaresTuristicosService {
  private lugaresTuristicos = [
  {
    id_lugar: '1',
    nombre: 'Chichén Itzá',
    ubicacion: 'Yucatán, México',
    descripcion: 'Zona arqueológica maya, una de las nuevas siete maravillas del mundo.',
  },
  {
    id_lugar: '2',
    nombre: 'Playa del Carmen',
    ubicacion: 'Quintana Roo, México',
    descripcion: 'Famosa por sus playas y vida nocturna.',
  },
];
  
  findAll() {
    return this.lugaresTuristicos;
  }

  findOne(id: string) {
    return this.lugaresTuristicos.find(lugar => lugar.id_lugar === id);
  }

}
