import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoPageRoutingModule } from './pedido-routing.module';

import { PedidoPage } from './pedido.page';
import { SharedModule } from "../../../modules/shared/shared.module";

@NgModule({
    declarations: [PedidoPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PedidoPageRoutingModule,
        SharedModule
    ]
})
export class PedidoPageModule {}
