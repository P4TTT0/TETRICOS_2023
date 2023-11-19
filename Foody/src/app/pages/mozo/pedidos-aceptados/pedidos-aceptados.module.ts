import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosAceptadosPageRoutingModule } from './pedidos-aceptados-routing.module';

import { PedidosAceptadosPage } from './pedidos-aceptados.page';
import { SharedModule } from "../../../modules/shared/shared.module";

@NgModule({
    declarations: [PedidosAceptadosPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PedidosAceptadosPageRoutingModule,
        SharedModule
    ]
})
export class PedidosAceptadosPageModule {}
