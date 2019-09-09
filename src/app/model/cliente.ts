import { Tarjeta } from './Tarjeta';
import { Persona } from './Persona';

export class Cliente {
  persona: Persona;
  tarjetas: [Tarjeta];
}

export class ClienteDto {
  identificacion: number;
  nombres: string;
  apellidos: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  tarjetas: [Tarjeta];
}
