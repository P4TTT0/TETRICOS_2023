import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidarUsuarioPageRoutingModule } from './validar-usuario-routing.module';
import { ValidarUsuarioPage } from './validar-usuario.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidarUsuarioPageRoutingModule,
    SharedModule,
  ],
  declarations: [ValidarUsuarioPage]
})
export class ValidarUsuarioPageModule {}
