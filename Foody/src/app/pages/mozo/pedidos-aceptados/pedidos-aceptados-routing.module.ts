import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosAceptadosPage } from './pedidos-aceptados.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosAceptadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosAceptadosPageRoutingModule {}
