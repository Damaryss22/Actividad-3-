import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicioService {
  private servicios = [
    {
      id: '1',
      descripcion: 'Corte de pelo para perros',
      tipo_servicio: 'Estética',
      horario: '09:00 - 17:00',
      precio: 300,
    },

    {
      id: '2',
      descripcion: 'Paseo de mascotas',
      tipo_servicio: 'Cuidado',
      horario: '08:00 - 20:00',
      precio: 150,
    },

    {
      id: '3',
      descripcion: 'Guardería de día',
      tipo_servicio: 'Cuidado',
      horario: '07:00 - 19:00',
      precio: 400,
    },
  ];

  findAll(){
    return this.servicios;
  }

  findOne(id: string){
    return this.servicios.find((servicio) => servicio.id === id);
  }
}
