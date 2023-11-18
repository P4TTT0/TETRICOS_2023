import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePedidoPageRoutingModule } from './detalle-pedido-routing.module';

import { DetallePedidoPage } from './detalle-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePedidoPageRoutingModule
  ],
  declarations: [DetallePedidoPage]
})
export class DetallePedidoPageModule {}
