import { Persona } from '../model/Persona';
import { FormGroup } from '@angular/forms';

export function mapearClientes(formularioCliente: FormGroup): Persona {
    return {
        identificacion: formularioCliente.get('identificacion').value,
        nombres: formularioCliente.get('nombre').value,
        apellidos: formularioCliente.get('apellido').value,
        ciudad: formularioCliente.get('ciudad').value,
        direccion: formularioCliente.get('direccion').value,
        telefono: formularioCliente.get('telefono').value
    };
}
