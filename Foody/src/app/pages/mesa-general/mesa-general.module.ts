import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesaGeneralPageRoutingModule } from './mesa-general-routing.module';

import { MesaGeneralPage } from './mesa-general.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesaGeneralPageRoutingModule,
    SharedModule
  ],
  declarations: [MesaGeneralPage]
})
export class MesaGeneralPageModule {}
