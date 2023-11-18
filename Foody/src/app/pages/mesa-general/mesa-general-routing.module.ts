import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesaGeneralPage } from './mesa-general.page';

const routes: Routes = [
  {
    path: '',
    component: MesaGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesaGeneralPageRoutingModule {}
