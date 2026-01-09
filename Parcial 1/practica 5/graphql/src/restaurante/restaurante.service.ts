import { Injectable } from '@nestjs/common';

@Injectable()
export class RestauranteService {
  private RESTAURANTES = [
  {
    id_lugar: '1',
      nombre: 'Playa del Sol',
      ubicacion: 'Cancún, México',
      descripcion: 'Hermosa playa para disfrutar del sol y la arena',
      id_restaurante: 'R1',
      tipo_comida: 'Mariscos',
    },
    {
      id_lugar: '2',
      nombre: 'Calle Gastronómica',
      ubicacion: 'Ciudad de México',
      descripcion: 'Zona con variedad de restaurantes gourmet',
      id_restaurante: 'R2',
      tipo_comida: 'Internacional',
    },
  ];

  findAll() {
    return this.RESTAURANTES;
  }

  findOne(id_restaurante: string) {
    return this.RESTAURANTES.find(
      (restaurante) => restaurante.id_restaurante === id_restaurante,
    );
  }
}
