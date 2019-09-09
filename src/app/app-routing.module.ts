import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';


const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'cliente/:id', component: CrearClienteComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
