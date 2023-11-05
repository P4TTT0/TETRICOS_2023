import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateMailPage } from './validate-mail.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateMailPageRoutingModule {}
