import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { PedidosComponent } from 'src/app/components/pedidos/pedidos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule
  ],
  declarations: [ProductPage, PedidosComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductPageModule {}
