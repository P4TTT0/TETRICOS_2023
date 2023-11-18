import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesaPage } from './mesa.page';

const routes: Routes = [
  {
    path: '',
    component: MesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesaPageRoutingModule {}
