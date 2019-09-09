import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente, ClienteDto } from '../model/cliente';
import { Persona } from '../model/Persona';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlClientes = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  private esVerCliente = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient ) { }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlClientes).pipe(
      map(clientes => clientes as Cliente[])
    );
  }

  crearCliente(cliente: Persona): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlClientes, cliente, {headers: this.httpHeaders} );
  }

  buscarCliente(identificacion: number): Observable<ClienteDto> {
    return this.http.get<ClienteDto>(`${this.urlClientes}/${identificacion}`);
  }

  actualizarCliente(cliente: Persona): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.urlClientes}/${cliente.identificacion}`, cliente, {headers: this.httpHeaders} );
  }

  eliminarCliente(identificacion: number): Observable<ClienteDto> {
    return this.http.delete<ClienteDto>(`${this.urlClientes}/${identificacion}`, {headers: this.httpHeaders} );
  }

  getVerDetalle(): Observable<boolean> {
    return this.esVerCliente.asObservable();
  }

  setVerDetalle(esVer: boolean) {
    this.esVerCliente.next(esVer);
  }
}
