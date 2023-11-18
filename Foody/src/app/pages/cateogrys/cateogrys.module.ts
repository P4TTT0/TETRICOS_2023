import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CateogrysPageRoutingModule } from './cateogrys-routing.module';

import { CateogrysPage } from './cateogrys.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CateogrysPageRoutingModule
  ],
  declarations: [CateogrysPage]
})
export class CateogrysPageModule {}
