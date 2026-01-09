export interface Transporte {
  id: number;
  nombre_empresa: string;
  nombre_cooperativa: string;
  precio: number;
  ruta: string; 

  calcularDistancia(): void;
  actualizarDisponibilidad(): void
  listarServicios(): void;
  calcularRuta(): void;
}
