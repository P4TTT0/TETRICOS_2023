import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncuestaPage } from './encuesta.page';

const routes: Routes = [
  {
    path: '',
    component: EncuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestaPageRoutingModule {}
