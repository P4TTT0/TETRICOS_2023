import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CateogrysPage } from './cateogrys.page';

const routes: Routes = [
  {
    path: '',
    component: CateogrysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CateogrysPageRoutingModule {}
