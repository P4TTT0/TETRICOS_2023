import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiPedidoPage } from './mi-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: MiPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiPedidoPageRoutingModule {}
