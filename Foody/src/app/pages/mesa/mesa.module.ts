import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesaPageRoutingModule } from './mesa-routing.module';

import { MesaPage } from './mesa.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesaPageRoutingModule,
    SharedModule
  ],
  declarations: [MesaPage]
})
export class MesaPageModule {}
