import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficosPageRoutingModule } from './graficos-routing.module';

import { GraficosPage } from './graficos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficosPageRoutingModule
  ],
  declarations: [GraficosPage]
})
export class GraficosPageModule {}
