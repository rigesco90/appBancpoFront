import { Consumo } from './Consumo';

export class Tarjeta {
    numero: string;
    tipo: string;
    ccv: string;
    consumos: [
        Consumo
    ];
}
