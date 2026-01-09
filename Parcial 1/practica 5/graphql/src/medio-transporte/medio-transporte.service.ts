import { Injectable } from '@nestjs/common';

@Injectable()
export class MedioTransporteService {
  
  private mediosTransporte = [
  {
    id_transporte: '1',
    nombreEmpresa: 'Transporte Express',
    tipo_transporte: 'bus',
    nombreCooperativa: 'Cooperativa Norte',
    ruta: 'Ciudad A - Ciudad B',
  },
  {
    id_transporte: '2',
    nombreEmpresa: 'Viajes Rápidos',
    tipo_transporte: 'taxi',
    nombreCooperativa: 'Cooperativa Central',
    ruta: 'Ciudad B - Ciudad C',
  },
];
  
  findAll() {
    return this.mediosTransporte;
  }

  findOne(id_transporte: string) {
    return this.mediosTransporte.find(
      (medio) => medio.id_transporte === id_transporte,
    );
  }
}
