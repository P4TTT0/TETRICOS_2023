import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaProductoPage } from './alta-producto.page';

const routes: Routes = [
  {
    path: '',
    component: AltaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaProductoPageRoutingModule {}
