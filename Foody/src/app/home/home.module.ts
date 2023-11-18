import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AdminHomeComponent } from '../components/homes/admin-home/admin-home.component';
import { SharedModule } from '../modules/shared/shared.module';
import { NoValidatedComponent } from '../components/homes/user/no-validated/no-validated.component';
import { ValidatedComponent } from '../components/homes/user/validated/validated.component';
import { MetreHomeComponent } from '../components/homes/metre-home/metre-home.component';
import { CocineroHomeComponent } from '../components/homes/cocinero-home/cocinero-home.component';
import { MozoHomeComponent } from '../components/homes/mozo-home/mozo-home.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, 
    SharedModule
  ],

  declarations: [HomePage, AdminHomeComponent, NoValidatedComponent, ValidatedComponent, MetreHomeComponent,  MozoHomeComponent, CocineroHomeComponent]
})

export class HomePageModule {}
