import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEsperaPageRoutingModule } from './lista-espera-routing.module';

import { ListaEsperaPage } from './lista-espera.page';
import { SharedModule } from "../../../modules/shared/shared.module";
import { AsignarMesaComponent } from 'src/app/components/mesas/asignar-mesa/asignar-mesa.component';

@NgModule({
    declarations: [ListaEsperaPage, AsignarMesaComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListaEsperaPageRoutingModule,
        SharedModule,        
    ]
})
export class ListaEsperaPageModule {}
