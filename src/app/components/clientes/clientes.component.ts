import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../model/cliente';
import Swal from 'sweetalert2';
import { Persona } from '../../model/Persona';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  private clientes: Cliente[];
  private cargando = false;

  constructor(private readonly clientesService: ClientesService) {}

  ngOnInit() {
    this.cargando = true;
    this.listarClientes();
  }

  listarClientes() {
    this.clientesService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.cargando = false;
    });
  }

  eliminarCliente(persona: Persona, index: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${persona.nombres}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.clientes.splice(index, 1);
        this.clientesService
          .eliminarCliente(persona.identificacion)
          .subscribe();
      }
    });
  }

  esVerDetalle() {
    this.clientesService.setVerDetalle(true);
  }
}
