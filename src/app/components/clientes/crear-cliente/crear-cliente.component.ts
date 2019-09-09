import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { mapearClientes } from '../../../transformers/mapear-cliente';
import { ClientesService } from '../../../services/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteDto } from '../../../model/cliente';
import { Persona } from '../../../model/Persona';
import { Tarjeta } from '../../../model/Tarjeta';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  formularioCliente: FormGroup = new FormGroup({});
  private editando: boolean;
  private esVer: boolean;
  private tarjetas: Tarjeta[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly clienteService: ClientesService,
    private readonly router: Router,
    private readonly actRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.crearFormularioCliente();
    this.cargarCliente();
    this.crearSubcripcionEsVerDetalle();
    this.editando = false;
  }

  crearFormularioCliente(): void {
    this.formularioCliente.addControl(
      'identificacion',
      this.fb.control('', [Validators.required, Validators.maxLength(10)])
    );
    this.formularioCliente.addControl(
      'nombre',
      this.fb.control('', [Validators.required, Validators.maxLength(50)])
    );
    this.formularioCliente.addControl(
      'apellido',
      this.fb.control('', [Validators.required, Validators.maxLength(50)])
    );
    this.formularioCliente.addControl(
      'ciudad',
      this.fb.control('', [Validators.required, Validators.maxLength(30)])
    );
    this.formularioCliente.addControl(
      'direccion',
      this.fb.control('', [Validators.required, Validators.maxLength(100)])
    );
    this.formularioCliente.addControl(
      'telefono',
      this.fb.control('', [Validators.required, Validators.maxLength(19)])
    );
  }

  guardarEditarCliente() {
    if (this.editando) {
      this.actualizarCliente();
      this.editando = false;
    } else {
      this.guardarCliente();
    }
  }

  guardarCliente(): void {
    if (this.formularioCliente.valid) {
      const clienteMapeado: Persona = mapearClientes(this.formularioCliente);
      this.clienteService.crearCliente(clienteMapeado).subscribe(resp => {
        this.router.navigate(['/cliente']);
      });
    }
  }

  cargarCliente(): void {
    const id = this.actRouter.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.clienteService
        .buscarCliente(Number(id))
        .subscribe((resp: ClienteDto) => {
          this.tarjetas = resp.tarjetas;
          this.cargarFormulario(resp);
          this.editando = true;
        });
    }
  }

  cargarFormulario(resp: ClienteDto): void {
    this.formularioCliente.get('identificacion').setValue(resp.identificacion);
    this.formularioCliente.get('nombre').setValue(resp.nombres);
    this.formularioCliente.get('apellido').setValue(resp.apellidos);
    this.formularioCliente.get('ciudad').setValue(resp.ciudad);
    this.formularioCliente.get('direccion').setValue(resp.direccion);
    this.formularioCliente.get('telefono').setValue(resp.telefono);
  }

  actualizarCliente() {
    if (this.formularioCliente.valid) {
      const clienteMapeado: Persona = mapearClientes(this.formularioCliente);
      this.clienteService
        .actualizarCliente(clienteMapeado)
        .subscribe(cliente => {
          this.router.navigate(['/cliente']);
          Swal.fire({
            title: clienteMapeado.nombres,
            text: 'Se actualizó correctamente',
            type: 'success'
          });
        });
    }
  }

  crearSubcripcionEsVerDetalle() {
    this.clienteService.getVerDetalle().subscribe(valor => {
      if (valor) {
        this.esVer = valor;
      }
    });
  }

  reiniciarValorEsVer() {
    this.clienteService.setVerDetalle(false);
    this.esVer = false;
  }
}
