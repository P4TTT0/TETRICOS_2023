import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidarUsuarioPage } from './validar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ValidarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidarUsuarioPageRoutingModule {}
