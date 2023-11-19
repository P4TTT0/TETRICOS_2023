import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPedidoPageRoutingModule } from './mi-pedido-routing.module';

import { MiPedidoPage } from './mi-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiPedidoPageRoutingModule
  ],
  declarations: [MiPedidoPage]
})
export class MiPedidoPageModule {}
