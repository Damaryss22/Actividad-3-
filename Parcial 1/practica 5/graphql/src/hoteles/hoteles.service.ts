import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelService {
  private hoteles = [
  {
    id_lugar: '1',
    nombre: 'Hotel Playa Bonita',
    ubicacion: 'Cancún, México',
    descripcion: 'Hotel frente al mar con todas las comodidades',
    id_hotel: 'H1',
    clasificacion: '5 estrellas',
  },
  {
    id_lugar: '2',
    nombre: 'Hotel Montaña Verde',
    ubicacion: 'Valle de Bravo, México',
    descripcion: 'Hotel rodeado de naturaleza y tranquilidad',
    id_hotel: 'H2',
    clasificacion: '4 estrellas',
  },
];

  findAll() {
    return this.hoteles;
  }

  findOne(id_hotel: string) {
    return this.hoteles.find((hotel) => hotel.id_hotel === id_hotel);
  }
}
