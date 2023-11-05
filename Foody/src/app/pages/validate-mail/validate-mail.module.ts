import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateMailPageRoutingModule } from './validate-mail-routing.module';

import { ValidateMailPage } from './validate-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidateMailPageRoutingModule
  ],
  declarations: [ValidateMailPage]
})
export class ValidateMailPageModule {}
